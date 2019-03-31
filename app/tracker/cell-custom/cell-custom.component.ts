import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-cell-custom',
  templateUrl: './cell-custom.component.html',
  styleUrls: ['./cell-custom.component.css']
})
export class CellCustomComponent implements OnInit{
  private cellValue:any;
  public tickets:object[]=[];
  
  
private data:any;
  constructor(private appService:AppService) { }

  ngOnInit() {
    this.tickets=this.appService.getUserInfoFromLocalstorageTickets();
    
  }
  agInit(params){
    this.cellValue=params.value;
  }

}
