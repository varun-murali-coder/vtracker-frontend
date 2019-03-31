import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Injectable({
  providedIn: 'root'
})
export class SharedSserviceService {
  public baseUrl='http://api.vcoderlearn.com/api/v1/tickets';
  public authToken:any;
  constructor(private http:HttpClient,appservice:AppService) { }
  
  /*Method to create a new ticket*/
  public createComment(ticketData):any{
    this.authToken=Cookie.get('authtoken');
    let myResponse=this.http.post(this.baseUrl+'/comment?authToken='+this.authToken,ticketData);
    return myResponse;
  }
  /*Method to issue description page*/
  public getSingleTicketCommentInformation(currentTicketId):any{
    this.authToken=Cookie.get('authtoken');
    let myResponse=this.http.get(this.baseUrl+'/comment/'+currentTicketId+'?authToken='+this.authToken);
    return myResponse;
  }

}
