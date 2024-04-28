import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';
import { ManageSessionService } from '../session-management/manage-session.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ManipulateLangService extends ManageSessionService {
  
  language_file_data!: Observable<any>;
  location_data!: Observable<any>;
  //pictures_data!: Observable<{}>;
  http_client!:HttpClient;

  constructor(private http_local:HttpClient, private hp_up:HttpClient, private http_cli:HttpClient) {
    super(hp_up);
    this.http_client = http_cli;
  }

  setAll(){
    this.getBrowserInfo();
    this.browser_lang.toLowerCase();
    this.language_file_data = this.getLanguageFile(this.browser_lang);
    this.location_data = this.getLocation();
    //this.pictures_data = this.getPictures();
  }

  setNewLanguage(lang_code:string){
    this.getBrowserInfo();
    this.browser_lang.toLowerCase();
    this.language_file_data = this.getLanguageFile(lang_code);
    this.location_data = this.getLocation();
    //this.pictures_data = this.getPictures();
  }

  




  getLanguageFile(lang_code:string): Observable<any>{
    var subject = new Subject<string>();
    var base_url = 'https://database.gen.tr/suleyman/2022/dupia_test/index.php';
    var query = '?preferred_lang='+lang_code;
    this.http_local?.get(base_url+query).subscribe((data:any)=>{
      data = JSON.parse(data);
      if(data['title']!=undefined){
        subject.next(data);
      }
    });
    return subject.asObservable();  
  }
}