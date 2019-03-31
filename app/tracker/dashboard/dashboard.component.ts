import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardTrackService } from 'src/app/dashboard-track.service';
import {Status}from './../../models/status';
declare var jQuery: any;
import { CellCustomComponent } from '../cell-custom/cell-custom.component';
import { SwPush } from '@angular/service-worker';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {
  public authToken: any;
  public userInfo: any;
  public userId: any;
  public allTickets:any;
  public allTicketsRes:any;
  public allTicketsResGrid:any;
  private gridApi;
  private gridColumnApi;
  public columnDefs;
  private sortingOrder;
  public statusDrop :Status[];
  public statusD:any;
 private dropSelected:number;
 private allTicketsResGridPop:object[]=[];
 private frmeworkComponent:any;

 //Create parameters declaration
 public title:any;
 public assignee:any;
 private reporter:any;
 private status:any;
 public description:any;
 public firstTwo:any;
 public keyword:any;





  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastrService,
    vcr: ViewContainerRef,
    public dashService:DashboardTrackService,
  ) { }



  ngOnInit() {


    jQuery(document).ready(function(){
      jQuery('[data-toggle="tooltip"]').tooltip(); 
    });
  
    this.statusD=5;
    this.statusDrop=[
      {id:1,name:"Pending"},
      {id:2,name:"In Progress"},
      {id:3,name:"In Testing"},
      {id:4,name:"Done"},
      {id:5,name:"select"},
];
    this.authToken = Cookie.get('authtoken');
    this.userId =Cookie.get('userId');
    this.userInfo=this.appService.getUserInfoFromLocalstorage();
    this.reporter=this.userInfo.firstName.concat(this.userInfo.lastName);
    this.firstTwo=this.reporter.substring(0, 2).toUpperCase();
this.allTickets=this.dashService.getAllTicktes().subscribe(
data=>{
  this.allTicketsRes=data["data"];
},error=>{
  console.log(error.errorMessage);
}

    )
  /*Logic for table*/
  this.columnDefs=[{
  headerName:"Title",
  field:"title",
  width:250,
  sortingOrder:["asc","desc"],
  filter:"agTextColumnFilter",
  cellRendererFramework:CellCustomComponent

  },
{
  headerName:"Reporter",
  field:"reporter",
  width:150,
  sortingOrder:["asc","desc"],
 filter:"agTextColumnFilter",


  },
  {
    headerName:"Date Of Creation",
    field:"created",
    width:200,
    sortingOrder:["asc","desc"] ,
    filter:"agDateColumnFilter",

  },{
    headerName:"Status",
    field:"status",
    width:100,
    sortingOrder:["asc","desc"] ,
    filter:"agTextColumnFilter",


  }
] 
}



onreadyGrid(params){
this.gridApi=params.api;
this.gridColumnApi=params.columnApi;
this.dashService.getAllTicktes().subscribe(
  data=>{

    this.allTicketsResGrid=data["data"];
    for(let x in this.allTicketsResGrid){
    if(this.reporter.toUpperCase().trim().replace(/ +/g, "")== this.allTicketsResGrid[x].assignee.toUpperCase().trim().replace(/ +/g, "")){
     this.allTicketsResGridPop.push (this.allTicketsResGrid[x]);
    }

 }
 this.appService.setUserInfoInLocalStorageTickets(this.allTicketsResGridPop)
 params.api.setRowData( this.allTicketsResGridPop);

  },error=>{
    console.log("some error occured")
    console.log(error.errorMessage);
  })

}




/*Creating a ticket */


public createTicket():any{
  let ticketData={
    title:this.title,
    assignee:this.assignee,
    reporter:this.reporter,
    status:this.statusDrop[this.statusD-1].name,
    description:this.description
  }
  this.dashService.createTicket(ticketData).subscribe(
    data=>{
this.toastr.success('Ticket Created Successfully'); 
setTimeout(()=>{
  jQuery("#createTicket").modal('hide');
      this.router.navigate(['/backlog']);
      },1000)
    },
    error=>{
      this.toastr.error("Some error occured");
     
     }
  )
 }

 public logout: any = () => {

  this.appService.logout()
    .subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        Cookie.delete('authtoken');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('ticketInfo');
        localStorage.removeItem('search');


        Cookie.delete('userId');
        Cookie.delete('issueId');
        this.router.navigate(['/']);

      } else {
        this.toastr.error(apiResponse.message)

      } // end condition

    }, (err) => {
      this.toastr.error('some error occured')


    });

} // end logout


/*Search Functionality*/
search(){
this.appService.setSerachInLocalStorageTickets(this.keyword);
setTimeout(()=>{
      this.router.navigate(['/search']);
      },1000)

}


  }


