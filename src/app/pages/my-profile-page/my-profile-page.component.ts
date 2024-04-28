import { Component, Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { ImageService } from 'src/app/compounds/my-profile-card/image.service';
import { PostItemComponent } from 'src/app/compounds/post-item/post-item.component';
import { ManageLanguageComponent } from 'src/app/language-management/manage-language/manage-language/manage-language.component';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/models/user/user.service';
import { PrivacyOptions } from '../../language-management/site-content/privacy-options';
import { ManagePostsService } from './manage-posts.service';


@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: ['./my-profile-page.component.scss']
})

export class MyProfilePageComponent{


}


/*export class MyProfilePageComponent {
  /*isPhotoExist = false;
  isTextExist = false;
  isPostMine = false;
  isSeeCommentsActive = false;

  user_name = "";
  user_surname = "";
  post_text_content = "";
  ref_post_id="";//"2aSEcHspPZVx";

  post_img_path = "";
  static isRootPathSetted = false;


  privacyOptions: PrivacyOptions[] = [];
  choosenPrivacy?: PrivacyOptions;

  @ViewChild('postedContentImage') content_image!: ElementRef;
  @ViewChild('postImageProfile') post_owner_profile_image!: ElementRef;

  @ViewChild('postedTextArea') post_text!: ElementRef;



  ngAfterViewInit() {

    const manotherPromise = new Promise((resolve, reject) => {
      this.setPostContext(this.ref_post_id);
      resolve('this is a promise');
    });
    manotherPromise.then((value) => {
      setTimeout(() => {
        this.setPostProp();
      }, 2000);

    });



  }

  setPostProp() {
    
    //alert(this.postManager.m_user.ref_id === this.loggedUserService.refId);
    if(this.postManager.m_user.ref_id === this.loggedUserService.refId){
      this.isPostMine=true;
    }else{
      this.isPostMine=false;
    }
    //alert(this.isPostMine);
    /*if (MyProfilePageComponent.isRootPathSetted == true && this.isPhotoExist == true) {
      this.content_image.nativeElement.src = this.postManager.post.file_path;
    }
    if (this.isPostMine==true){
      this.choosenPrivacy = new PrivacyOptions(
        ManageLanguageComponent.privacy_options[this.postManager.post.privacy_type].code, 
        ManageLanguageComponent.privacy_options[this.postManager.post.privacy_type].name
      );
      this.user_name = this.loggedUserService.name;
      this.user_surname = this.loggedUserService.surname;
    }else{
      this.loggedUserService.getAuserByRefId(this.postManager.m_user.ref_id).subscribe({
        next: (respon: any) => {
          this.user_name = respon.name;
          this.user_surname = respon.surname;
        }
      });
    }
    this.imageService.getFile(this.postManager.m_user.ref_id, "myContext").subscribe({
      next: (respon: any) => {
        if(respon['result'] != null && respon['result']!=undefined && respon['result']!=""){
          let profile_image_root_path = "http://localhost:8090/dupia/angRes/backend_two/views/images/profilePics/"
          this.postManager.m_user.profile_image_path = profile_image_root_path + respon['result'];
          this.post_owner_profile_image.nativeElement.src = this.postManager.m_user.profile_image_path;
          //this.post_owner_profile_image.nativeElement.src=respon['result'];
          //alert("post_owner_profile_image: "+respon['result']);
        /*}
      }
    });


  }

  setPostContext(post_ref_id: string) {


    const anotherPromise = new Promise((resolve, reject) => {
      this.postManager.getIterator(post_ref_id);
      resolve('this is a promise');
    });
    anotherPromise.then((value) => {
      if (MyProfilePageComponent.isRootPathSetted == false) {
        let post_img_root_path = "http://localhost:8090/dupia/angRes/backend_two/views/images/postAttachments/";
        this.postManager.post.file_path = post_img_root_path + this.postManager.post.file_path;
        MyProfilePageComponent.isRootPathSetted = true;
      }
      if (this.postManager.post.file_path != "" && this.postManager.post.file_path != "init" && this.postManager.post.file_path != null && this.postManager.post.file_path != undefined) {
        this.isPhotoExist = true;
      } else {
        this.isPhotoExist = false;
      }
      if (this.postManager.post.content != "" && this.postManager.post.content != null && this.postManager.post.content != undefined) {
        this.isTextExist = true;
        this.post_text_content = this.postManager.post.content;
        this.post_text.nativeElement.value = this.post_text_content;
      } else {
        this.isTextExist = false;
      }

      /*if(this.postManager.m_user.ref_id == this.loggedUserService.refId){
        this.isPostMine=true;
      }else{
        this.isPostMine=false;
      }*/


      //alert(this.postManager.post.file_path + "    " + this.isPhotoExist);
      
    //}
    /*
      
      alert("   post_text_content: "+this.postManager.post.file_path);
      //alert("2: "+this.postManager.post.file_path);
      if(this.postManager.post.file_path != "" && this.postManager.post.file_path != "init" && this.postManager.post.file_path != null && this.postManager.post.file_path != undefined){
        this.isPhotoExist = true;
        //alert("2")
        var post_img_root_path = "localhost/dupia/angRes/backend_two/views/images/postAttachments/";
        this.postManager.post.file_path = post_img_root_path+this.postManager.post.file_path;
        this.content_image.nativeElement.src = this.postManager.post.file_path;
        /*this.imageService.getPostedFile(related_post_id).subscribe({
          next: (respon: any) => {
            this.content_image.nativeElement.src=respon['result'];
          }
        });*/
      //alert("isPhotoExist: "+this.isPhotoExist+"   content_image_src: "+this.content_image.nativeElement.src);
      /*}else{
        this.isPhotoExist = false;
        //alert("isPhotoExist: "+this.isPhotoExist);
      }
      //alert("3");

      if(owner_user_ref_id == this.loggedUserService.refId){
        this.isPostMine=true;
        this.choosenPrivacy = new PrivacyOptions(
          ManageLanguageComponent.privacy_options[this.postManager.post.privacy_type].code, 
          ManageLanguageComponent.privacy_options[this.postManager.post.privacy_type].name
        );
        this.user_name = this.loggedUserService.name;
        this.user_surname = this.loggedUserService.surname;
      }else{
        this.isPostMine=false;
        this.loggedUserService.getAuserByRefId(owner_user_ref_id).subscribe({
          next: (respon: any) => {
            this.user_name = respon.name;
            this.user_surname = respon.surname;
          }
        });
      }
      //alert("isPostMine: "+this.isPostMine+"   user_name: "+this.user_name);
      //alert("4");
      
      this.imageService.getFile(owner_user_ref_id, "myContext").subscribe({
        next: (respon: any) => {
          if(respon['result'] != null && respon['result']!=undefined && respon['result']!=""){
            this.post_owner_profile_image.nativeElement.src=respon['result'];
            //alert("post_owner_profile_image: "+respon['result']);
          }
        }
      });

      //alert("5");

      console.log(value);
    });

    //subscribe about all my posts
    //...
    /*
    this.postManager.allMyPosts.subscribe((res:any) => {
      //do whatever u want
      var post = res[post_ref_id];
      //alert("ref: "+post_ref_id+"   post val len: "+res[post_ref_id].content);
      alert("ref: "+post_ref_id+"   post val len: "+post.content);
    //  return res[post_ref_id];
    //});
    //this.postManager.getIterator(post_ref_id).subscribe({
    //  next: (post:any) => {
        var related_post_id = post.post_ref_id;
        var owner_user_ref_id = post.owner_ref_id;
        alert("owner_ref: "+owner_user_ref_id+"   related_post_id: "+related_post_id);
        alert("1");

        if(post.content != "" && post.content != null && post.content != undefined){
          this.isTextExist = true;
          this.post_text_content = post.content;
          this.post_text.nativeElement.value = this.post_text_content;
        }else{
          this.isTextExist = false;
        }
        alert("isTextExist: "+this.isTextExist+"   post_text_content: "+this.post_text_content);
        alert("2");


        if(post.img_path != "init" && post.img_path != null && post.img_path != undefined){
          this.isPhotoExist = true;
          this.imageService.getPostedFile(related_post_id).subscribe({
            next: (respon: any) => {
              this.content_image.nativeElement.src=respon['result'];
            }
          });
          alert("isPhotoExist: "+this.isPhotoExist+"   content_image_src: "+this.content_image.nativeElement.src);
        }else{
          this.isPhotoExist = false;
          alert("isPhotoExist: "+this.isPhotoExist);
        }
        alert("3");

        
        
        if(owner_user_ref_id == this.loggedUserService.refId){
          this.isPostMine=true;
          this.choosenPrivacy = new PrivacyOptions(
            ManageLanguageComponent.privacy_options[post.privacy_type].code, 
            ManageLanguageComponent.privacy_options[post.privacy_type].name
          );
          this.user_name = this.loggedUserService.name;
          this.user_surname = this.loggedUserService.surname;
        }else{
          this.isPostMine=false;
          this.loggedUserService.getAuserByRefId(owner_user_ref_id).subscribe({
            next: (respon: any) => {
              this.user_name = respon.name;
              this.user_surname = respon.surname;
            }
          });
        }
        alert("isPostMine: "+this.isPostMine+"   user_name: "+this.user_name);
        alert("4");
        
        this.imageService.getFile(owner_user_ref_id, "myContext").subscribe({
          next: (respon: any) => {
            if(respon['result'] != null && respon['result']!=undefined && respon['result']!=""){
              this.post_owner_profile_image.nativeElement.src=respon['result'];
              alert("post_owner_profile_image: "+respon['result']);
            }
          }
        });

        alert("5");

        
        
        
      }
    //}
    );*/
    //);
  //}



  /*constructor(private loggedUserService: UserService, private postManager: ManagePostsService, private imageService: ImageService) {
    this.onLoad();
    //this.user_name = this.loggedUserService.name;
    //this.user_surname = this.loggedUserService.surname;

  }

  onLoad() {
    this.privacyOptions = ManageLanguageComponent.privacy_options;
    //this.choosenPrivacy = new PrivacyOptions(
    //  ManageLanguageComponent.privacy_options[0].code, ManageLanguageComponent.privacy_options[0].name
    //);

  }

  getPrivacyOptionsList() {
    return this.privacyOptions;
  }

  privacyChanged(event: any) {
    this.choosenPrivacy = this.privacyOptions[parseInt(event)];
  }



  changeSeeCommentsStatus() {
    this.isSeeCommentsActive = (!this.isSeeCommentsActive);
  }

  unshareOnClicked() {
    //unshare clicked -- remove me from shared list...
  }

  likeOnClicked() {
    //like button clicked -- check me from liked list...
    alert(this.isPhotoExist);
    //alert("2: "+this.postManager.post.file_path);
    alert("2: " + this.postManager.post.file_path);
    if (MyProfilePageComponent.isRootPathSetted == true && this.isPhotoExist == true) {
      this.content_image.nativeElement.src = this.postManager.post.file_path;
    }
  }

  commentOnClicked() {
    //comment button clicked -- activate/deactivate comment interface...
  }







  /*
  //About the posts that are received
  isPhotoExist = false;
  //About the post that is meant to be sent
  myTextAreaData:any;
  m_file!: File;
  isPhotoAttached = false;
  selectedFile!: ImageSnippet;
  reader = new FileReader();
  @ViewChild('postImage') onImageButton!: ElementRef;
  @ViewChild('sendPostImage') post_image!: ElementRef;
  @ViewChild('postTextArea') post_text_area!: ElementRef;
  @ViewChild('realImageProfile') post_profile_image!: ElementRef;
  @ViewChild('postButt') send_post_button!: ElementRef;

  isValidText = false;
  isValidPhoto = false;

  user_name="";
  user_surname="";

  privacyOptions: PrivacyOptions[] = [];
  choosenPrivacy?: PrivacyOptions;

  addPhotoButtonStatus = true;

  constructor(private imageService: ImageService, private loggedUserService: UserService, private postService: ManagePostsService) {
    this.onLoad();
    this.user_name = this.loggedUserService.name;
    this.user_surname = this.loggedUserService.surname;
  }

  onLoad() {
    this.privacyOptions = ManageLanguageComponent.privacy_options;
    this.choosenPrivacy = new PrivacyOptions(
      ManageLanguageComponent.privacy_options[0].code, ManageLanguageComponent.privacy_options[0].name
    );

  }


  ngAfterViewInit() {
    this.post_profile_image.nativeElement.src = this.imageService.path
    this.send_post_button.nativeElement.disabled = true;
  }

  onPostSubmit() {

    const anotherPromise = new Promise((resolve, reject) => {

      this.send_post_button.nativeElement.disabled = true;
      let owner_ref_id = this.loggedUserService.refId;
      let content = this.post_text_area.nativeElement.value;
      let privacy_type = this.choosenPrivacy!.code;
      this.postService.newPost(owner_ref_id, content, privacy_type);
      resolve('this is a promise');
    });
    anotherPromise.then((value) => {
      if (this.isPhotoAttached) {
        this.uploadPostPhoto();
        console.log(value);
      }
      this.isPhotoAttached = false;
      this.post_text_area.nativeElement.value = "";
      this.send_post_button.nativeElement.disabled = false;
      this.addPhotoButtonStatus = true;
    });
  }

  uploadPostPhoto() {
    this.postService.getIdOfLatestPost(this.loggedUserService.refId)
      .subscribe({
        next: (res) => {
          var related_id = res.datum;
          this.imageService.postFile(related_id, this.m_file).subscribe({
            next: (res) => {
              alert(res);
            }
          });
        }
      }
      );
  }


  textHasBeenChanged(event:any) {
    var text_len = this.post_text_area.nativeElement.value.length;
    if (text_len == 0) {
      this.isValidText = false;
    } else {
      this.isValidText = true;
    }
    this.checkPostButtonActivated();
  }

  checkPostButtonActivated() {
    if (this.isValidPhoto || this.isValidText) {
      this.send_post_button.nativeElement.disabled = false;
    } else {
      this.send_post_button.nativeElement.disabled = true;
    }
  }


  imageHasBeenChanged(postImageUploadButton: any) {
    var file: File = postImageUploadButton.files[0];
    this.m_file = file;
    var path = URL.createObjectURL(file);
    this.post_image.nativeElement.src = path;

  }

  requestChangePhotoStatus() {
    const anotherPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.addPhotoButtonStatus = (!this.addPhotoButtonStatus);
        this.isPhotoAttached = (!this.isPhotoAttached);

        if (this.isPhotoAttached == true) {
          this.isValidPhoto = true;
        } else {
          this.isValidPhoto = false;
        }
        this.checkPostButtonActivated();
        resolve('this is a promise');
      }, 50);
    });
    anotherPromise.then((value) => {
      setTimeout(() => {
        console.log(value);
        if (this.isPhotoAttached) {
          this.onImageButton.nativeElement.click();
        }
      }, 120);
    });
  }

  setImageViaButton() {
    this.onImageButton.nativeElement.click();
  }

  getPrivacyOptionsList() {
    return this.privacyOptions;
  }

  privacyChanged(event: any) {
    this.choosenPrivacy = this.privacyOptions[parseInt(event)];
  }*/
//}
