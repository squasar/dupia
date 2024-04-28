import { Component, ElementRef, OnInit, Optional, ViewChild, Renderer2 } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ManageLanguageComponent } from '../../../language-management/manage-language/manage-language/manage-language.component';//'/language-management/manage-language/manage-language.component';
import { SignupForm } from 'src/app/language-management/site-content/signup-form';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/models/user/user.service';
import { User } from 'src/app/models/user/user';
import { RegisteredUserService } from '../../registered-user.service';
import { Router } from '@angular/router';

export interface CustomCheckBox {
  tag: string;
  is_checked: boolean;
  color: ThemePalette;
}


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @ViewChild('sendButt') send_butt!: ElementRef;
  @ViewChild('sampleForm') sample_form!: ElementRef;
  @ViewChild('klein') all_els!: ElementRef;


  custom_checkbox: CustomCheckBox = {
    tag: 'acceptTermsOfSignup',
    is_checked: false,
    color: 'primary',
  }

  signup_form: SignupForm;

  registered_user!: User;
  submitted!: boolean;

  registered_parent_id?: string = "";


  _text?:string="";

  //register edilecek User nesnesini hazırlamak ve form kontrollerini sağlamak...
  constructor(@Optional() public dialogRef: MatDialogRef<RegisterFormComponent>, private userService: UserService, private signedUserService: RegisteredUserService, private router: Router) {
    this.signup_form = ManageLanguageComponent.signup_form;
    this.registered_user = new User();

    this.registered_parent_id = this.userService.getData();
    //this.registered_parent_id = this.userService.getParentId();

    //alert(this.registered_parent_id);

    if (this.registered_parent_id == "" || this.registered_parent_id == null || this.registered_parent_id == undefined) {
      this.registered_user.ref_id_for_real = "";
      this.registered_parent_id = this.signup_form.reference_id;
      this._text = ""; 
    }else{
      this.registered_user.ref_id_for_real = this.registered_parent_id;
      this._text = this.registered_parent_id;
    }
  }

  ngAfterViewInit() {
    this.sample_form.nativeElement.addEventListener('input', this.onInputForm.bind(this));
  }
  
  onInputForm(event: any) {
    if (!this.send_butt.nativeElement.disabled) {
      if (this._text=="") {
        this.send_butt.nativeElement.disabled = true;
      }
      else {
        this.send_butt.nativeElement.disabled = false;
      }
    }
  }

  ngOnInit(): void {
    this.signup_form = ManageLanguageComponent.signup_form;
  }

  onSubmit() {
    this.userService.createOrGet(this.registered_user)
      .subscribe({
        next: (res) => {
          this.signedUserService.data=res;
          this.submitted = true;
          if(res.message == "SUCCESSFUL"){
            //redirect after alerting signup successfull
            alert("Kayıt Başarılı");
            this.all_els.nativeElement.remove();
            this.router.navigate(['']);
          }
          if(res.message == "ALREADYAMEMBER"){
            //redirect after alerting signup failed since there is a user that using the platform with the same email address
            alert("Kayıt başarısız. Belirtilen email başka bir kullanıcı tarafından kullanılmakta. Lütfen tekrar deneyin.");
            this.all_els.nativeElement.remove();
            this.router.navigate(['']);
          }
        },
        error: (e) => console.error(e)
      });

    console.log("Submitted Value : "+this.submitted);

    }

}
