import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ManipulateLangService } from '../../manipulate-lang.service';
import { SignupForm } from '../../site-content/signup-form';
import { CookieService } from 'ngx-cookie-service';
import { Lang } from './lang';
import { SignupLoginButtons } from '../../site-content/signup-login-buttons';
import { LoginForm } from '../../site-content/login-form';
import { PrivacyOptions } from '../../site-content/privacy-options';


/*https://indepth.dev/posts/1047/implementing-multi-language-angular-applications-rendered-on-server*/

class PostButton {
  post_button = "";
  add_photo_button = "";
  delete_photo_button = "";
  like_button = "";
  comment_button = "";
  share_button = "";
  unshare_button = "";
  see_comments = "";

  constructor() { }

  setDefault() {
    this.post_button = "";
    this.add_photo_button = "";
    this.delete_photo_button = "";
    this.like_button = "";
    this.comment_button = "";
    this.share_button = "";
    this.unshare_button = "";
    this.see_comments = "";
  }

}

@Component({
  selector: 'app-manage-language',
  templateUrl: './manage-language.component.html',
  styleUrls: ['./manage-language.component.scss'],
})

export class ManageLanguageComponent implements OnInit {

  country_name_code = "";
  country_name = "";
  browser_language = "";
  ipAddress = "";

  @Input() selected = new Lang("", "", "-1");

  static signup_form: SignupForm = {};
  static login_form: LoginForm = {};
  static privacy_options: PrivacyOptions[] = [];
  static post_contents: PostButton;


  static languages: Lang[] = [];


  static login_signup_buttons: SignupLoginButtons = {};
  //static login_signup_buttons: ButtonConstants = {login_button_text: '',signup_button_text: ''};
  //static login_button: string[];
  //static register_button: any;


  getSignupForm(): SignupForm {
    return ManageLanguageComponent.signup_form;
  }

  getLanguageList(): Lang[] {
    return ManageLanguageComponent.languages;
  }

  getPrivacyOptionsList(): PrivacyOptions[] {
    return ManageLanguageComponent.privacy_options;
  }

  /*"text_on_form_header": "Login",
  "email": "Email",
  "password":"Password",
  "login_button_text": "Login",
  "login_result_text": "Login is successful!"
  password_required_warning?:string;
    email_required_warning?:string;


  */
  /*
  "posts": [
          {
              "post_button": "Yayımla",
              "add_photo_button": "Fotoğraf Ekle",
              "delete_photo_button": "Fotoğrafı Sil",
              "like_button": "Beğen",
              "comment_button": "Yorum",
              "share_button": "Paylaş",
              "unshare_button": "İptal"
          }
      ]
  */

  private updatePostButtonContents(res:any){
    ManageLanguageComponent.post_contents = new PostButton();
    ManageLanguageComponent.post_contents.setDefault();
    ManageLanguageComponent.post_contents.post_button = res["posts"][0]["post_button"];
    ManageLanguageComponent.post_contents.add_photo_button = res["posts"][0]["add_photo_button"];
    ManageLanguageComponent.post_contents.delete_photo_button = res["posts"][0]["delete_photo_button"];
    ManageLanguageComponent.post_contents.like_button = res["posts"][0]["like_button"];
    ManageLanguageComponent.post_contents.comment_button = res["posts"][0]["comment_button"];
    ManageLanguageComponent.post_contents.share_button = res["posts"][0]["share_button"];
    ManageLanguageComponent.post_contents.unshare_button = res["posts"][0]["unshare_button"];
    ManageLanguageComponent.post_contents.see_comments = res["posts"][0]["see_comments"];
    
  }

  private updatePrivacyOptionsContents(res: any) {
    var p_name_everyone = res["privacy_options"][0]["everyone"];
    var p_name_network = res["privacy_options"][0]["network"];
    var p_name_onlyme = res["privacy_options"][0]["justme"];
    this.cleanArr(ManageLanguageComponent.privacy_options);

    ManageLanguageComponent.privacy_options.push(new PrivacyOptions("0", p_name_everyone));
    ManageLanguageComponent.privacy_options.push(new PrivacyOptions("1", p_name_network));
    ManageLanguageComponent.privacy_options.push(new PrivacyOptions("2", p_name_onlyme));
  }

  private cleanArr(arr: any[]) {
    var _len = arr.length;
    for (var ind = 0; ind < _len; ind++) {
      arr.pop();
    }
  }





  private updateLoginFormContents(res: any) {
    ManageLanguageComponent.login_form.email = res["login_form"][0]["email"];
    ManageLanguageComponent.login_form.password = res["login_form"][0]["password"];
    ManageLanguageComponent.login_form.login_button_text = res["login_form"][0]["login_button_text"];
    ManageLanguageComponent.login_form.login_result_text = res["login_form"][0]["login_result_text"];
    ManageLanguageComponent.login_form.text_on_form_header = res["login_form"][0]["text_on_form_header"];
    ManageLanguageComponent.login_form.password_required_warning = res["login_form"][0]["password_required_warning"];
    ManageLanguageComponent.login_form.email_required_warning = res["login_form"][0]["email_required_warning"];
    ManageLanguageComponent.login_form.forgot_password_text = res["login_form"][0]["forgot_password_text"];
  }


  constructor(private lang_service: ManipulateLangService, public translate: TranslateService, private cookieService: CookieService) {
    if (this.cookieService.get('default_lang_code') != "") {
      var _code = this.cookieService.get('default_lang_code');
      lang_service.setNewLanguage(_code)

    } else {
      lang_service.setAll();
    }
    this.browser_language = this.lang_service.browser_lang;
    //this.initialize_(lang_service);
  }

  /*initialize_(lang_service:ManipulateLangService){
    lang_service.language_file_data.subscribe((res) => {
      if(res){
        this.update_header_buttons_content(res);
      }
    });
  }*/

  ngOnInit() {
    this.lang_service.language_file_data.subscribe((res) => {
      this.update_register_form_content(res);
      this.update_language_menu_content(res);
      if (res) {
        this.update_header_buttons_content(res);
        this.updateLoginFormContents(res);
        this.updatePrivacyOptionsContents(res);
        this.updatePostButtonContents(res);
      }
    });

    this.lang_service.location_data.subscribe((res) => {
      var splits = res.split(",");
      this.country_name_code = splits[1].toLowerCase();
      this.country_name = splits[2];
      this.ipAddress = splits[0];
    })
  }

  langChanged(val: any) {
    this.lang_service.setNewLanguage(val);
    this.cookieService.set('default_lang_code', val);
    this.lang_service.language_file_data.subscribe((res) => {
      this.update_register_form_content(res);
      this.update_language_menu_content(res);
      if (res) {
        this.update_header_buttons_content(res);
        this.updateLoginFormContents(res);
        this.updatePrivacyOptionsContents(res);
        this.updatePostButtonContents(res);
      }
    });
  }

  private update_header_buttons_content(res: any) {
    ManageLanguageComponent.login_signup_buttons.login_button_text = res["header"][0]["login_button_text"];
    ManageLanguageComponent.login_signup_buttons.signup_button_text = res["header"][0]["register_button_text"];
  }

  private update_language_menu_content(res: any) {
    //Get Languages
    ManageLanguageComponent.languages.push(new Lang("", "", "-1"));//making sure the array is not empty!
    ManageLanguageComponent.languages.splice(0)
    ManageLanguageComponent.languages.push(new Lang("tr", res["languages"][0]["turkish"], "0"));
    ManageLanguageComponent.languages.push(new Lang("us", res["languages"][0]["english"], "1"));
    ManageLanguageComponent.languages.push(new Lang("de", res["languages"][0]["german"], "2"));
    ManageLanguageComponent.languages.push(new Lang("cn", res["languages"][0]["mandarin"], "3"));
    ManageLanguageComponent.languages.push(new Lang("in", res["languages"][0]["hindi"], "4"));
    ManageLanguageComponent.languages.push(new Lang("es", res["languages"][0]["spanish"], "5"));
    ManageLanguageComponent.languages.push(new Lang("fr", res["languages"][0]["french"], "6"));
    ManageLanguageComponent.languages.push(new Lang("ar", res["languages"][0]["arabic"], "7"));
    ManageLanguageComponent.languages.push(new Lang("bn", res["languages"][0]["bengali"], "8"));
    ManageLanguageComponent.languages.push(new Lang("ru", res["languages"][0]["russian"], "9"));
    ManageLanguageComponent.languages.push(new Lang("pt", res["languages"][0]["portuguese"], "10"));
    ManageLanguageComponent.languages.push(new Lang("id", res["languages"][0]["indonesian"], "11"));
    //...

  }

  private update_register_form_content(res: any) {
    ManageLanguageComponent.signup_form._password_length = "6";
    ManageLanguageComponent.signup_form.title = res["title"];
    ManageLanguageComponent.signup_form.text_on_form_header = res["register_form"][0]["text_on_form_header"];
    ManageLanguageComponent.signup_form.name = res["register_form"][0]["name"];
    ManageLanguageComponent.signup_form.name_required_warning = res["register_form"][0]["name_required_warning"];
    ManageLanguageComponent.signup_form.surname = res["register_form"][0]["surname"];
    ManageLanguageComponent.signup_form.surname_required_warning = res["register_form"][0]["surname_required_warning"];
    ManageLanguageComponent.signup_form.email = res["register_form"][0]["email"];
    ManageLanguageComponent.signup_form.email_required_warning = res["register_form"][0]["email_required_warning"];
    ManageLanguageComponent.signup_form.password = res["register_form"][0]["password"];
    ManageLanguageComponent.signup_form.password_required_warning = res["register_form"][0]["password_required_warning"];
    ManageLanguageComponent.signup_form.password_minLength_warning = res["register_form"][0]["password_minLength_warning"];
    ManageLanguageComponent.signup_form.accept_terms_text = res["register_form"][0]["accept_terms_text"];
    ManageLanguageComponent.signup_form.accept_terms_link_part = res["register_form"][0]["accept_terms_link_part"];
    ManageLanguageComponent.signup_form.register_button_text = res["register_form"][0]["register_button_text"];
    ManageLanguageComponent.signup_form.register_result_text = res["register_form"][0]["register_result_text"];
    ManageLanguageComponent.signup_form.tag = res["register_form"][0]["tag"];
    //...
    ManageLanguageComponent.signup_form.phone = res["register_form"][0]["phone"];
    ManageLanguageComponent.signup_form.phone_required_warning = res["register_form"][0]["phone_required_warning"];
    ManageLanguageComponent.signup_form.birthday = res["register_form"][0]["birthday"];
    ManageLanguageComponent.signup_form.birthday_required_warning = res["register_form"][0]["birthday_required_warning"];
    ManageLanguageComponent.signup_form.reference_id = res["register_form"][0]["reference_id"];
    ManageLanguageComponent.signup_form.passwords_need_to_be_same_warning = res["register_form"][0]["passwords_need_to_be_same_warning"];
    ManageLanguageComponent.signup_form.password_required_again_warning = res["register_form"][0]["password_required_again_warning"];
    ManageLanguageComponent.signup_form.password_again = res["register_form"][0]["password_again"];
    ManageLanguageComponent.signup_form.reference_min_warning = res["register_form"][0]["reference_min_warning"];



    /**
    
    password_required_again_warning?:string;
    password_again?:string;


    phone?:string;
    phone_required_warning?:string;
    birthday?:string;
    birthday_required_warning?:string;
     * 
     */

    //change password_minLength_warning
    var pre_text = ManageLanguageComponent.signup_form.password_minLength_warning?.split("(")[0];
    var pos_text = ManageLanguageComponent.signup_form.password_minLength_warning?.split(")")[1];
    var all_pass_min_text = pre_text + ManageLanguageComponent.signup_form._password_length + pos_text;
    ManageLanguageComponent.signup_form.password_minLength_warning = all_pass_min_text;
    //alert(this.signup_form.password_minLength_warning);
    //change accept_terms_text
    ManageLanguageComponent.signup_form._accept_terms_pre_text = ManageLanguageComponent.signup_form.accept_terms_text?.split("(")[0];
    ManageLanguageComponent.signup_form._accept_terms_pos_text = ManageLanguageComponent.signup_form.accept_terms_text?.split(")")[1];
    ManageLanguageComponent.signup_form.accept_terms_text = ManageLanguageComponent.signup_form._accept_terms_pre_text + ManageLanguageComponent.signup_form.accept_terms_link_part
      + ManageLanguageComponent.signup_form._accept_terms_pos_text;
    //alert(this.signup_form.accept_terms_text);
  }
}