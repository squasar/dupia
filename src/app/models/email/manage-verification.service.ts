import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/user';

const sendMailUrl = 'http://localhost:8080/api/com/sendmailverification';


@Injectable({
  providedIn: 'root'
})
export class ManageVerificationService {

  verificationStatusChanged: EventEmitter<any> = new EventEmitter();
  verificationStatus: any;

  get data(): any {
    return this.verificationStatus;
  }

  set data(val: any) {
    this.verificationStatus = val;
    this.verificationStatusChanged.emit(val);
  }


  constructor(private http: HttpClient) { }

  sendVerificationMail(receiver_mail: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<User>(`${sendMailUrl}`, { email: receiver_mail }, httpOptions);
  }


}
