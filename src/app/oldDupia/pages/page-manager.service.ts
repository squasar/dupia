import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageManagerService {

  nameChanged: EventEmitter<any> = new EventEmitter();
  nameStatus: any;

  set name(name:any){
    this.nameStatus = name;
    this.nameChanged.emit(name);
  }
  get name():any{
    return this.nameStatus;
  }

  constructor() { }
}
