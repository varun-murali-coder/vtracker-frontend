import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DashboardTrackService } from 'src/app/dashboard-track.service';
import { CellCustomComponent } from '../cell-custom/cell-custom.component';
declare var jQuery: any;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  public columnDefs;
  private allTicketsResGrid: any;
  private allTicketsResGridPop: object[] = [];
  public authToken: any;
  public userId: any;
  public userInfo: any;
  private reporter: any;
  public allTickets: any;
  public allTicketsRes: any;
  public keyword: any;
  public splitVariable: any;



  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastrService,
    vcr: ViewContainerRef,
    public dashService: DashboardTrackService
  ) { }

  ngOnInit() {

    jQuery(document).ready(function(){
      jQuery('[data-toggle="tooltip"]').tooltip(); 
    });
    this.keyword = this.appService.getSearchFromLocalstorageTickets();
    /*Removing special characters if any*/
    this.splitVariable = this.keyword.split(/[\s,~!@#$%^&*()?:;.]+/);
    this.authToken = Cookie.get('authtoken');
    this.userId = Cookie.get('userId');
    this.userInfo = this.appService.getUserInfoFromLocalstorage();


    /*Logic for table*/
    this.columnDefs = [{
      headerName: "Title",
      field: "title",
      width: 250,
      sortingOrder: ["asc", "desc"],
      filter: "agTextColumnFilter",
      cellRendererFramework: CellCustomComponent


    },
    {
      headerName: "Reporter",
      field: "reporter",
      width: 150,
      sortingOrder: ["asc", "desc"],
      filter: "agTextColumnFilter"

    },
    {
      headerName: "Date Of Creation",
      field: "created",
      width: 200,
      sortingOrder: ["asc", "desc"],
      filter: "agDateColumnFilter"
    }, {
      headerName: "Status",
      field: "status",
      width: 100,
      sortingOrder: ["asc", "desc"],
      filter: "agTextColumnFilter"

    }
    ]

  }

  /*Keyword search functionality*/
  onreadyGrid(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.dashService.getAllTicktes().subscribe(
      data => {

        this.allTicketsResGrid = data["data"];
        for (let i in this.splitVariable) {
          for (let x in this.allTicketsResGrid) {
            if (this.allTicketsResGrid[x].title.toUpperCase().includes(this.splitVariable[i].toUpperCase()) && this.splitVariable[i] != "") {
              this.allTicketsResGridPop.push(this.allTicketsResGrid[x]);
            }
          }
        }
        this.appService.setUserInfoInLocalStorageTickets(this.allTicketsResGridPop)
        params.api.setRowData(this.allTicketsResGridPop);

      }, error => {
        console.log(error.errorMessage);
      })

  }


}
