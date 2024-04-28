import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ImageService } from 'src/app/compounds/my-profile-card/image.service';
import { PostItemComponent } from 'src/app/compounds/post-item/post-item.component';
import { ManageLanguageComponent } from 'src/app/language-management/manage-language/manage-language/manage-language.component';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/models/user/user.service';
import { PrivacyOptions } from '../../language-management/site-content/privacy-options';
import { ManagePostsService } from '../manage-posts.service';


class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}


@Component({
  selector: 'app-send-post-panel',
  templateUrl: './send-post-panel.component.html',
  styleUrls: ['./send-post-panel.component.scss']
})
export class SendPostPanelComponent {

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

  addPhotoButtonText="";
  deletePhotoButtonText="";
  postButtonText="";

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
    this.addPhotoButtonText = ManageLanguageComponent.post_contents.add_photo_button;
    this.deletePhotoButtonText = ManageLanguageComponent.post_contents.delete_photo_button;
    this.postButtonText = ManageLanguageComponent.post_contents.post_button;

  }


  ngAfterViewInit() {

    const manotherPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setProfilePic();
      }, 2000);
      resolve('this is a promise');
    });
    manotherPromise.then((value) => {
      setTimeout(() => {
        this.setButtonProp();
      }, 1000);
      
    });

    
    
  }

  setProfilePic(){
    this.imageService.getFileForPost(this.loggedUserService.refId).subscribe({
      next: (respon: any) => {
        if(respon['result'] != null && respon['result']!=undefined && respon['result']!=""){
          this.imageService.path = respon['result'];
          this.post_profile_image.nativeElement.src = this.imageService.path;
        }
      }
    });
    //this.post_profile_image.nativeElement.src = this.imageService.path;
  }

  setButtonProp(){
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
  }
}
