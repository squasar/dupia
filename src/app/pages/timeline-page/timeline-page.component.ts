import { Component } from '@angular/core';
import { LoggedUserService } from 'src/app/login/logged-user.service';
import { UserService } from 'src/app/models/user/user.service';

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss']
})
export class TimelinePageComponent {

  email!:string;

  constructor(private logged_usr:UserService){
    if(logged_usr.email != undefined && logged_usr.email!=null && logged_usr.email!="" ){
      this.email = logged_usr.email;
    }/*else{
      var res = localStorage.getItem('userMail');
      if(res !='' && res !=null && res !=undefined){
        this.email = res;
        logged_usr.email = res;
      }
    }*/
    
  }

}
