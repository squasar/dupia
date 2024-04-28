import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisteredUserService {
  signedUserstatusChanged: EventEmitter<any> = new EventEmitter();
  signedUserstatus: any;
  sb_members!:any[];

  constructor() {}
  
  get data(): any {
    return this.signedUserstatus;
  }
  
  set data(val: any) {
    this.signedUserstatus = val;
    this.signedUserstatusChanged.emit(val);
  }
}
