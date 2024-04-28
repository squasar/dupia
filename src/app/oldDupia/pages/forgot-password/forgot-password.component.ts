import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private router:Router){}

  sendResetLink(){
    //after sending resetting email...
    //...
    alert("Şifre yenileme linkini e-posta adresinize ilettik!");
    this.router.navigate(['/login']);
  }

}
