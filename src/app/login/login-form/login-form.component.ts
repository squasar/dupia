import { Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ManageLanguageComponent } from '../../language-management/manage-language/manage-language/manage-language.component';//'src/app/language-management/manage-language/manage-language.component';
import { LoginForm } from 'src/app/language-management/site-content/login-form';
import { RegisterFormComponent } from 'src/app/register/registerForm/register-form/register-form.component';
import { ElementRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/models/user/user.service';
import { User } from 'src/app/models/user/user';
import { LoggedUserService } from '../logged-user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @ViewChild('form') formRef!: ElementRef;
  @ViewChild('formWithHeader') all_form!: ElementRef;
  @ViewChild('klein') empty_item!: ElementRef;
  

  login_form:LoginForm;
  model!: User;

  static is_first:boolean=true;
  submitted!: boolean;

  //logged_user!: User;

  constructor(@Optional() public dialogRef: MatDialogRef<LoginFormComponent>, private userService: UserService, private loggedUserService: LoggedUserService, private router: Router) { 
    this.login_form = ManageLanguageComponent.login_form;
    LoginFormComponent.is_first = true;
    this.model = new User();
    //alert(this.signup_form.title);
  }

  

  ngOnInit(): void {
    this.login_form = ManageLanguageComponent.login_form;
    LoginFormComponent.is_first = true;
    //alert(this.signup_form.title);
  }

  onSubmit() {
    //alert('Form gönderildi!! :-)\n\n' + JSON.stringify(this.model))
    //var usr = new User();
    //usr.name = "Ali";
    //usr.email = "veldel@hotmail.com";
    this.userService.login(this.model)
      .subscribe({
        next: (res) => {
          //alert("ACTUAL RESPONSE MAİL : "+res.message);
          //this.loggedUserService.data=res.datum;
          this.submitted = true;
          if(res.message == "SUCCESSFUL"){
            this.formRef.nativeElement.remove();
            this.all_form.nativeElement.remove();
            this.empty_item.nativeElement.focus();
            //setAuth
            this.userService.email = res.email;
            this.userService.refId = res.ref_id;
            this.userService.photo = res.photo;
            
            this.userService.name = res.name;
            this.userService.surname = res.surname;
            this.userService.point = res.point;
            this.userService.phone = res.phone;
            
            this.userService.yetki = res.yetki;
            this.userService.childeren = res.sub_net;
            this.userService.high = res.top_net;
            this.userService.isGhost = res.isGhost;
            

            this.userService.refLink = res.ref_link;
            this.userService.city = res.city;
            this.userService.nickname = res.nickname;
            this.userService.howManyDays = res.howManyDays;
            this.userService.birthDay = res.birth_day;
            this.userService.generation = res.generation;
            this.userService.isVerified = res.isVerified;

            /*
             email: any;
  photo: any;

  point: any;
  name:any;
  surname:any;
  ref_link:any;
  city:any;
  nickname:any;
  howManyDays:any;
  birthDay:any;
  generation:any;
  isVerified:any;
             */
            //alert("PHOTO VAL : "+ res.ref_id);
            //this.loggedUserService.data=res.datum;
            //this.loggedUserService.childeren = res.sub_net;
            //this.loggedUserService.high = res.top_net;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userMail', this.userService.email);
            //localStorage.setItem('id',this.userService.refId);
            this.router.navigate(['/timeline']);
            
          }else if(res.message == "NOTAMEMBER"){
            alert("Girilen bilgilerle kayıtlı herhangi bir kullanıcı bulunamadı!");
          }else{
            alert("Yanlış email veya şifre giridi!");
          }
        },
        error: (e) => console.error(e)
      });
    //alert("Submitted Value : "+this.submitted);
  }

  onFocused(){
    if(LoginFormComponent.is_first)
      //this.formRef.nativeElement.focus();
      LoginFormComponent.is_first = false;
  }


}
