import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DashboardTrackService } from 'src/app/dashboard-track.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
declare var jQuery: any;


@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  public columnDefs;
  private allTicketsResGrid:any;
  private allTicketsResGridPop:object[]=[];
  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastrService,
    vcr: ViewContainerRef,
    public dashService:DashboardTrackService
  ) { }

  ngOnInit() {

    jQuery(document).ready(function(){
      jQuery('[data-toggle="tooltip"]').tooltip(); 
    });
 /*Logic for table*/
 this.columnDefs=[{
  headerName:"Title",
  field:"title",
  width:250,
  sortingOrder:["asc","desc"],
  filter:"agTextColumnFilter"

  },
{
  headerName:"Reporter",
  field:"reporter",
  width:150,
  sortingOrder:["asc","desc"],
 filter:"agTextColumnFilter"

  },
  {
    headerName:"Date Of Creation",
    field:"created",
    width:200,
    sortingOrder:["asc","desc"] ,
    filter:"agDateColumnFilter"
  },{
    headerName:"Status",
    field:"status",
    width:100,
    sortingOrder:["asc","desc"] ,
    filter:"agTextColumnFilter"

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
            if( this.allTicketsResGrid[x].status.toUpperCase().trim().replace(/ +/g, "")!="Done".toUpperCase().trim().replace(/ +/g, "")){
             this.allTicketsResGridPop.push (this.allTicketsResGrid[x]);
            }
        
         }
    
    
     params.api.setRowData( this.allTicketsResGridPop);
    
      },error=>{
        console.log(error.errorMessage);
      })
    
    }

}
