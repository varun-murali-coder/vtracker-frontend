import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  public baseUrl = 'http://api.vcoderlearn.com/api/v1';

  constructor(private http: HttpClient) { }
  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(this.baseUrl + '/subscription', subscription);
  }
  send() {
    return this.http.post(this.baseUrl + '/sendNotification', null);
  }

}
