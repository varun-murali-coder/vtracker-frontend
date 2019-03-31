import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommentComponent } from './comment/comment.component';
import { SharedSserviceService } from './shared-sservice.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NavbarComponent, CommentComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  exports:[
    NavbarComponent,
    CommentComponent
    
  ],
  providers:[SharedSserviceService]
})
export class SharedModule { }
