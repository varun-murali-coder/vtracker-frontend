import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Injectable({
  providedIn: 'root'
})
export class DashboardTrackService {

  public baseUrl = 'http://api.vcoderlearn.com/api/v1/tickets';
  public authToken: any;

  constructor(private http: HttpClient, appservice: AppService) {


  }

  /*Method to get the ticket details for Backlog*/
  public getAllTicktes(): any {
    this.authToken = Cookie.get('authtoken');

    let myResponse = this.http.get(this.baseUrl + '/all?authToken=' + this.authToken);
    return myResponse;
  }

  /*Method to create a new ticket*/
  public createTicket(ticketData): any {
    this.authToken = Cookie.get('authtoken');
    let myResponse = this.http.post(this.baseUrl + '/create?authToken=' + this.authToken, ticketData);
    return myResponse;
  }
  /*Method to issue description page*/
  public getSingleTicketInformation(currentTicketId): any {
    this.authToken = Cookie.get('authtoken');
    let myResponse = this.http.get(this.baseUrl + '/view/' + currentTicketId + '?authToken=' + this.authToken);
    return myResponse;
  }

  /*Method to edit ticket*/
  public editBlog(issueId, ticketData): any {
    this.authToken = Cookie.get('authtoken');
    let myResponse = this.http.put(this.baseUrl + '/' + issueId + '/edit?authToken=' + this.authToken, ticketData);
    return myResponse;


  }

  /*Method to create Watchers*/
  public createWatchers(ticketData): any {
    this.authToken = Cookie.get('authtoken');
    let myResponse = this.http.post(this.baseUrl + '/search?authToken=' + this.authToken, ticketData);
    return myResponse;
  }


  /*Method to issue description page*/
  public getWatchersdInformation(currentTicketId): any {
    this.authToken = Cookie.get('authtoken');
    let myResponse = this.http.get(this.baseUrl + '/search/' + currentTicketId + '?authToken=' + this.authToken);
    return myResponse;
  }

}
