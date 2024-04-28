import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUserService } from 'src/app/login/logged-user.service';
import { UserService } from 'src/app/models/user/user.service';

@Component({
  selector: 'app-logged-in-header',
  templateUrl: './logged-in-header.component.html',
  styleUrls: ['./logged-in-header.component.scss']
})
export class LoggedInHeaderComponent {
//http://localhost:4200

  constructor(private logged_user:UserService, private router: Router){

  }

  goOut(event:any){
    //this.logged_user.logout();
    this.logged_user.realLogout();
    this.router.navigate(['main']);
  }

  goToMyDashboard(event:any){
    this.router.navigate(['timeline']);
  }

  goToMyProfile(event:any){
    this.router.navigate(['my_profile']);
  }

  goToMyNetwork(event:any){
    this.router.navigate(['my_network']);
  }


}
