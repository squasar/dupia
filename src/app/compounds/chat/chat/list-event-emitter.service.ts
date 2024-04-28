import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListEventEmitterService {

  invokeFirstComponentFunction = new EventEmitter();    
  subsVar?: Subscription;    
    
  constructor() { }    
    
  onFirstComponent() {    
    this.invokeFirstComponentFunction.emit();    
  }    
}
