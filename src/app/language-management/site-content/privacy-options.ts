import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";

export class PrivacyOptions{
    code:string;
    name:string;
    svg_content?:Observable<any>;
    bhv?:BehaviorSubject<any>;
    constructor(code:string, name:string){
      this.code = code;
      this.name = name;
    }


    
}