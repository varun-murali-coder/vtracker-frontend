import { Component, OnInit } from '@angular/core';
import { DashboardTrackService } from 'src/app/dashboard-track.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from 'src/app/push-notification.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  public currentTicket: any;
  private editorForm: FormGroup;
  private editorContent: string;
  public authToken: any;
  public userId: any;
  public userInfo: any;
  public reporterDescPage: any;
  public currentWatcher: any;
  readonly VAPID_PUBLIC: any = "BGipyx-30iVqiZvziwZ-DwV0cmltT-BcFqkPS02FhvOUb4p7de74kZai4vtcrDijePswGScG0RAREBBPaERkusw";
  //Adding height
  private editorStyle = {
    height: '300px',
    backgroundColor: '#ffffff'//To add transparency and add color
  }
  //only take what we want
  config = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['code-block']
    ]
  }
  constructor(
    private _route: ActivatedRoute, private router: Router, public dashboardService: DashboardTrackService, public appService: AppService, private toastr: ToastrService,
    public swPush: SwPush, private pushService: PushNotificationService
  ) { }

  ngOnInit() {

    this.userInfo = this.appService.getUserInfoFromLocalstorage();
    this.reporterDescPage = this.userInfo.firstName.concat(this.userInfo.lastName);
    //For quill editor-Using reactive forms
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
    let myTicketId = this._route.snapshot.paramMap.get('id');
    Cookie.set('issueId', myTicketId);

    this.dashboardService.getSingleTicketInformation(myTicketId).subscribe(
      data => {
        this.currentTicket = data["data"];
      }, error => {
        console.log(error.errorMessage);
      }
    )

    this.dashboardService.getWatchersdInformation(myTicketId).subscribe(
      data => {
        this.currentWatcher = data["data"];
      }, error => {
        console.log(error.errorMessage);
      }
    )



  }

  subscribeToNotification() {
    /*for subscribing to the server*/
    if (this.swPush.isEnabled) {
      this.swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC
        })
        .then(subscription => {
          this.pushService.sendSubscriptionToTheServer(subscription).subscribe();
        })
        .catch(console.error);
    }
    /*To display the watchers list logic*/


    let ticketData = {
      userName: this.reporterDescPage,
      issueId: Cookie.get('issueId')
    }
    this.dashboardService.createWatchers(ticketData).subscribe(
      data => {
        this.toastr.success('Watchers added Successfully');

      },
      error => {
        this.toastr.error("Some error occured");

      }
    )

  }





  getServerRespo() {
    this.pushService.send().subscribe();
  }


  onSubmit() {
    this.editorContent = this.editorForm.get('editor').value;
  }
  maxlength(e) {
    if (e.editor.getLength() > 100) {
      e.editor.deleteText(100, e.editor.getLength())
    }
  }


  editThisBlog() {
    this.dashboardService.editBlog(this.currentTicket.issueId, this.currentTicket).subscribe(
      data => {
        this.toastr.success("Edit success");
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000)
      }, error => {
        this.toastr.error("Some error occured");

      }

    )
  }

}
