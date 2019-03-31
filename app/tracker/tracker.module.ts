import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardTrackService } from '../dashboard-track.service';
import { DescriptionComponent } from './description/description.component';
import { SharedModule } from '../shared/shared.module';
import { BacklogComponent } from './backlog/backlog.component';
import { CellCustomComponent } from './cell-custom/cell-custom.component';
import {QuillModule} from 'ngx-quill';
import { PushNotificationService } from '../push-notification.service';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [DashboardComponent,DescriptionComponent, BacklogComponent, CellCustomComponent,SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    QuillModule,
    ReactiveFormsModule,
   RouterModule.forChild([
      {path:'dashboard',component:DashboardComponent},
      {path:'description/:id',component:DescriptionComponent},
      {path:'backlog',component:BacklogComponent},
      {path:'search',component:SearchComponent},



    ]),
    AgGridModule.withComponents([DashboardComponent,BacklogComponent])

  ],
  providers:[DashboardTrackService,PushNotificationService],
  entryComponents:[CellCustomComponent]

})
export class TrackerModule { }
