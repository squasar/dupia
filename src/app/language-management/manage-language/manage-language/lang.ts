import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ManipulateLangService } from "../../manipulate-lang.service";

export class Lang{
    code:string;
    name:string;
    id:string;
    svg_content!:Observable<any>;
    bhv!:BehaviorSubject<any>;
    constructor(code:string, name:string, id:string){
      this.code = code;
      this.name = name;
      this.id = id;
      
      //this.picture_link = "https://database.gen.tr/suleyman/2022/dupia_test/country_flags/"+this.code+".svg";
      //https://database.gen.tr/suleyman/2022/dupia_test/country_flags/tr.svg
    }


    
}