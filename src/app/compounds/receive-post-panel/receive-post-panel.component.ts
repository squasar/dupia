import { Component, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { ManageLanguageComponent } from 'src/app/language-management/manage-language/manage-language/manage-language.component';
import { PrivacyOptions } from 'src/app/language-management/site-content/privacy-options';
import { UserService } from 'src/app/models/user/user.service';
import { MyProfilePageComponent } from 'src/app/pages/my-profile-page/my-profile-page.component';
import { ManagePostsService } from '../manage-posts.service';
import { ImageService } from '../my-profile-card/image.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-receive-post-panel',
  templateUrl: './receive-post-panel.component.html',
  styleUrls: ['./receive-post-panel.component.scss']
})
export class ReceivePostPanelComponent {

  isPhotoExist = false;
  isTextExist = false;
  isPostMine = false;
  isSeeCommentsActive = false;

  user_name = "";
  user_surname = "";
  post_text_content = "";
  ref_post_id="2aSEcHspPZVx";//"2aSEcHspPZVx";

  post_img_path = "";
  isRootPathSetted = false;



  privacyOptions: PrivacyOptions[] = [];
  choosenPrivacy?: PrivacyOptions;

  likeButtonText="";
  totalLikes=0;
  commentButtonText="";
  totalComments=0;
  shareButtonText="";
  totalShares=0;
  unshareButtonText="";
  seeCommentsText="";

  @ViewChild('postedContentImage') content_image!: ElementRef;
  @ViewChild('postImageProfile') post_owner_profile_image!: ElementRef;

  @ViewChild('postedTextArea') post_text!: ElementRef;



  ngAfterViewInit() {


    const amanotherPromise = new Promise((resolve, reject) => {
      this.getPostContext();
      resolve('this is a promise');
    });
    amanotherPromise.then((value) => {
      setTimeout(() => {
        this.setPostFooterAndComments();
      }, 2000);
      
    });



  }

  setPostFooterAndComments(){

    const amanotherPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setPostNumbers();
      }, 2000);
      resolve('this is a promise');
    });
    amanotherPromise.then((value) => {
      setTimeout(() => {
        this.setPostNumbersView();
      }, 2000);
      
    });
  }

  setPostNumbers(){
    this.postManager.getInfoAboutPost(this.postManager.post.post_ref_id).subscribe({
      next: (respon: any) => {
        this.postManager.post.total_likes = respon.total_likes;
        this.postManager.post.total_comments = respon.total_comments;
        this.postManager.post.total_shares = respon.total_shares;
      }
    });
  }

  setPostNumbersView(){
    this.totalLikes = this.postManager.post.total_likes;
    this.totalComments = this.postManager.post.total_comments;
    this.totalShares = this.postManager.post.total_shares;
  }





  getPostContext(){
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
    if (this.isRootPathSetted == true && this.isPhotoExist == true) {
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
    this.imageService.getFileForPost(this.postManager.m_user.ref_id).subscribe({
      next: (respon: any) => {
        if(respon['result'] != null && respon['result']!=undefined && respon['result']!=""){
          this.postManager.m_user.profile_image_path = respon['result'];
          this.post_owner_profile_image.nativeElement.src = this.postManager.m_user.profile_image_path;
        }
      }
    });


  }

  setPostContext(post_ref_id: string) {


    const anotherPromise = new Promise((resolve, reject) => {
      this.postManager.getIterator(post_ref_id);
      resolve('this is a promise');
    });
    anotherPromise.then((value) => {
      if (this.isRootPathSetted == false) {
        this.postManager.post.file_path = this.postManager.post.file_path;
        this.isRootPathSetted = true;
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

    }
    );
  }



  constructor(private loggedUserService: UserService, private postManager: ManagePostsService, private imageService: ImageService) {

    this.onLoad();

  }

  onLoad() {
    this.privacyOptions = ManageLanguageComponent.privacy_options;

    this.likeButtonText = ManageLanguageComponent.post_contents.like_button;
    this.commentButtonText = ManageLanguageComponent.post_contents.comment_button;
    this.shareButtonText = ManageLanguageComponent.post_contents.share_button;
    this.unshareButtonText = ManageLanguageComponent.post_contents.unshare_button;
    this.seeCommentsText = ManageLanguageComponent.post_contents.see_comments;

   
  }

  getPrivacyOptionsList() {
    return this.privacyOptions;
  }

  privacyChanged(event: any) {

    const anmanotherPromise = new Promise((resolve, reject) => {
      this.updatePrivacyOnView(parseInt(event));
      resolve('this is a promise');
    });
    anmanotherPromise.then((value) => {
      setTimeout(() => {
        this.updatePrivacyOnDB(this.postManager.post.post_ref_id, parseInt(event));
      }, 2000);
      
    });


    /*this.choosenPrivacy = this.privacyOptions[parseInt(event)];
    //update privacy though...
    this.postManager.updatePostPrivacy(this.postManager.post.post_ref_id, parseInt(event)).subscribe({
      next: (respon: any) => {
        setTimeout(() => {
          console.log("Post Privacy has been changed!");
        }, 1000);
      }
    });*/
  }

  updatePrivacyOnView(type:number){
    this.choosenPrivacy = this.privacyOptions[type];
    //alert(type);
  }

  updatePrivacyOnDB(id:string, type:number){
    this.postManager.updatePostPrivacy(this.postManager.post.post_ref_id, type).subscribe({
      next: (respon: any) => {
        setTimeout(() => {
          console.log("Post Privacy has been changed!");
        }, 500);
      }
    });
  }





  changeSeeCommentsStatus() {
    this.isSeeCommentsActive = (!this.isSeeCommentsActive);
  }

  unshareOnClicked() {
    //unshare clicked -- remove me from shared list...
  }

  likeOnClicked() {
    //like button clicked -- check me from liked list...

  }

  commentOnClicked() {
    //comment button clicked -- activate/deactivate comment interface...
  }





  getKeys(obj:any){

  }

}


