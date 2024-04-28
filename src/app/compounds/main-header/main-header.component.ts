import { Component } from '@angular/core';
import { ManageLanguageComponent } from '../../language-management/manage-language/manage-language/manage-language.component';//'src/app/language-management/manage-language/manage-language.component';
import { SignupLoginButtons } from 'src/app/language-management/site-content/signup-login-buttons';
import {MatDialogModule ,MatDialog, MatDialogRef} from '@angular/material/dialog';
import { RegisterFormComponent } from 'src/app/register/registerForm/register-form/register-form.component';
import { LoginFormComponent } from 'src/app/login/login-form/login-form.component';


@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent {
  
  signup_login_buttons:SignupLoginButtons;

  constructor(public dialog: MatDialog) {
    //console.log(Object.values(ManageLanguageComponent.login_signup_buttons));
    this.signup_login_buttons = ManageLanguageComponent.login_signup_buttons;


    //this.login_button_text = ManageLanguageComponent.login_signup_buttons[0].login_button_text;
    //this.register_button_text = ManageLanguageComponent.login_signup_buttons[0].signup_button_text;
    /*
    //ManageLanguageComponent.login_button[1]="UGUR";
    //this.login_button_text = ManageLanguageComponent.login_button;
    alert("Sample : "+typeof ManageLanguageComponent.login_button);
    this.login_button_text = ManageLanguageComponent.login_button[0];
    //this.register_button_text = ManageLanguageComponent.register_button;
    //alert("Tsss : "+ManageLanguageComponent.login_button[0])
    console.log("Tsss : ");*/
  }

  ngOnInit(): void {
    this.signup_login_buttons = ManageLanguageComponent.login_signup_buttons;
    //this.login_button_text = ManageLanguageComponent.login_signup_buttons[0].login_button_text;
    //this.register_button_text = ManageLanguageComponent.login_signup_buttons[0].signup_button_text;
    /*
    this.login_button_text = ManageLanguageComponent.login_button[0];
    //this.register_button_text = ManageLanguageComponent.register_button;
    alert("Tsss2 : "+ManageLanguageComponent.login_button[0])*/
  }


  openDialogSignup(enterAnimationDuration: string, exitAnimationDuration: string, args:any): void {
    this.dialog.open(RegisterFormComponent, {
      width: 'auto',
      height: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogLogin(enterAnimationDuration: string, exitAnimationDuration: string, args:any): void {
    //args.preventDefault();
    this.dialog.open(LoginFormComponent, {
      width: 'auto',
      height: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


}
