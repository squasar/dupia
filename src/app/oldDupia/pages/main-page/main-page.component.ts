import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageManagerService } from '../page-manager.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {


  constructor(private router:Router,private pageManager:PageManagerService){}


  loginClicked(){
    //this.router.navigate(['/login']);
    this.router.navigate(['/login']);
    //this.router.navigateByUrl('/login');
    //this.pageManager.name="login-page";
  }

  signupClicked(){
    //alert("Signup Clicked!!!");
    this.router.navigate(['/signup']);
  }




}
