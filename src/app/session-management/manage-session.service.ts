import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageSessionService{

  ipAddress="";
  country_name="";
  country_code="";
  
  browser_lang="";
  browser_name="";
  browser_version="";

  isMobile=false;

  constructor(private http_location:HttpClient) { }

  /*getIPAddress(): Observable<string>{
    let _ip:string;
    var subject = new Subject<string>();
    this.http_ip.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      _ip = res;
      subject.next(_ip);
      //this.ipAddress = res.ip;
    });
    return subject.asObservable();
  }*/

  getLocation(): Observable<string>{
    let _name:string;
    var subject = new Subject<string>();
    //alert("this.result2 = "+this.ipAddress);
    this.http_location.get('http://www.geoplugin.net/json.gp?ip=').subscribe((res_con:any)=>{
      this.country_name = res_con['geoplugin_countryName'];
      this.country_code = res_con['geoplugin_countryCode'];
      this.ipAddress = res_con['geoplugin_request'];
      _name = this.ipAddress+","+this.country_code+","+this.country_name; //res_con['geoplugin_countryName'];
      subject.next(_name);
      //this.country_name_and_code = this.country_code+" , "+this.country_name;
    });
    return subject.asObservable();
  }

  getBrowserInfo():void{
    var agent = navigator.userAgent.toLowerCase();
    this.browser_name = 
      agent.indexOf('edge')>-1 ? 'Microsoft Edge'
      : agent.indexOf('edg') > -1 ? 'Chromium-based Edge'
      : agent.indexOf('opr') > -1 ? 'Opera'
      : agent.indexOf('chrome') > -1 ? 'Chrome'
      : agent.indexOf('trident') > -1 ? 'Internet Explorer'
      : agent.indexOf('firefox') > -1 ? 'Firefox'
      : agent.indexOf('safari') > -1 ? 'Safari'
      : 'other';

    this.browser_lang = navigator.language;
    this.isMobile = window.navigator.maxTouchPoints > 0 ? true : false;
    this.browser_version = this.detectBrowserVersion();
  }

  private detectBrowserVersion(){
    var userAgent = navigator.userAgent, tem, 
    matchTest = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    
    if(/trident/i.test(matchTest[1])){
        tem =  /\brv[ :]+(\d+)/g.exec(userAgent) || [];
        return 'IE '+(tem[1] || '');
    }
    if(matchTest[1]=== 'Chrome'){
        tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    matchTest= matchTest[2]? [matchTest[1], matchTest[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= userAgent.match(/version\/(\d+)/i))!= null) matchTest.splice(1, 1, tem[1]);
    return matchTest.join(' ');
  }

  /*getTotalQuestions(idForm:string): Observable<string> {
    let totalQuestions:number;
    var subject = new Subject<string>();
    this.getFirebaseData(idForm+"/Metadatos")
    .subscribe(items => {
        items.map(item => {
    
          totalQuestions=item.Total;
          console.log(totalQuestions);
          subject.next(totalQuestions);
        });
      }
    );
      return subject.asObservable();
    }*/

  /*getCountryName():string{
    //alert("this.result2 = "+this.country_name);
    return this.country_name;
  }*/

}
