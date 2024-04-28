import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {


  constructor(private router:Router){}

  forgotPassword(){
    this.router.navigate(['/forgotPassword']);
  }

  login(){}

}
