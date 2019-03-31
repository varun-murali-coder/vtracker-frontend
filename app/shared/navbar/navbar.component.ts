import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public firstTwo:any;
  private userInfo:any;
  private reporter:any;



  constructor(public appService:AppService,public router: Router,
    private toastr: ToastrService,
    vcr: ViewContainerRef) { }

  ngOnInit() {
    this.userInfo=this.appService.getUserInfoFromLocalstorage();
    this.reporter=this.userInfo.firstName.concat(this.userInfo.lastName);
    this.firstTwo=this.reporter.substring(0, 2).toUpperCase();

  }
  public logout: any = () => {

    this.appService.logout()
      .subscribe((apiResponse) => {
  
        if (apiResponse.status === 200) {
          console.log("logout called")
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

}
