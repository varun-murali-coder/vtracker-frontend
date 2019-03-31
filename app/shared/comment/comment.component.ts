import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SharedSserviceService } from '../shared-sservice.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  public commentList:string[]=[];
  public comment:any;
  public userInfo:any;
  public reporter:any;
  public issueId:any;
  public currentComment:any;
  constructor(
    public appService:AppService,public router: Router,
    private toastr: ToastrService,
    vcr: ViewContainerRef,
    private sharedService:SharedSserviceService
  
  ) { }

  ngOnInit() {
    this.userInfo=this.appService.getUserInfoFromLocalstorage();
    this.reporter=this.userInfo.firstName.concat(this.userInfo.lastName)+':';
    let ticketInfo=this.appService.getUserInfoFromLocalstorageTickets();
    this.issueId=Cookie.get('issueId');

    this.sharedService.getSingleTicketCommentInformation(this.issueId).subscribe(
      data=>{
        this.currentComment=data["data"];
      },error=>{
        console.log(error.errorMessage);
      }
    )

  }
  postComment(){
    this.commentList.push(this.comment);
    
  let ticketData={
    comment:this.comment,
    issueId:this.issueId
  }
  this.sharedService.createComment(ticketData).subscribe(
    data=>{
this.toastr.success('Comment added Successfully'); 
setTimeout(()=>{
},1000)
    },
    error=>{
      this.toastr.error("Some error occured");
     
     }
  )
 }
  

}
