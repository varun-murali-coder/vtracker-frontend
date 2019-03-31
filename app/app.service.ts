import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/operator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url =  'http://api.vcoderlearn.com';

  constructor(
    public http: HttpClient
  ) {

    

  } // end constructor  


  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) =>{

    localStorage.setItem('userInfo', JSON.stringify(data))


  }

  /*For tickets Local Storage*/
  public getUserInfoFromLocalstorageTickets = () => {

    return JSON.parse(localStorage.getItem('ticketInfo'));

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorageTickets = (data) =>{

    localStorage.setItem('ticketInfo', JSON.stringify(data))


  }


  /*For Search keyword Local Storage*/
  public getSearchFromLocalstorageTickets = () => {

    return JSON.parse(localStorage.getItem('search'));

  } // end getUserInfoFromLocalstorage


  public setSerachInLocalStorageTickets = (data) =>{

    localStorage.setItem('search', JSON.stringify(data))


  }

  public signupFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobile', data.mobile)
      .set('email', data.email)
      .set('password', data.password)

    return this.http.post(`${this.url}/api/v1/users/signup`, params);

  } // end of signupFunction function.

  public signinFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.url}/api/v1/users/login`, params);
  } // end of signinFunction function.

  
  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', Cookie.get('authtoken'))
      .set('userId',Cookie.get('userId'))

    return this.http.post(`${this.url}/api/v1/users/logout`, params);

  } // end logout function

  

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError
}
