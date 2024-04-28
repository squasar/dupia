import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/models/user/user.service';
import { ImageService } from './image.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-my-profile-card',
  templateUrl: './my-profile-card.component.html',
  styleUrls: ['./my-profile-card.component.scss']
})
export class MyProfileCardComponent {

  email: any;
  photo: any;
  phone: any;
  yetki: any;
  isGhost: any;

  sub_net!: any[];
  top_net!: any[];

  point: any;
  name: any;
  surname: any;
  ref_link: any;
  city: any;
  nickname: any;
  howManyDays: any;
  birthDay: any;
  generation: any;
  isVerified: any;
  isVerifiedText: any;

  link: any = "";

  image_root_path: any;
  hasImageOnDB: any = true;

  selectedFile!: ImageSnippet;
  reader = new FileReader();
  @ViewChild('realImage') profile_image_view!: ElementRef;

  constructor(private imageService: ImageService, private loggedService: UserService, private router: Router) {
    this.email = this.loggedService.email;
    this.imageService.name = this.getImage();
    this.image_root_path = "http://localhost:8090/dupia/angRes/backend_two/views/images/profilePics/";
    this.hasImageOnDB = true;
  }

  setParams() {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.getImage();
        resolve('this is a promise');
      }, 3000);
    });
    myPromise.then((value) => {
      this.getAllOthers();
      this.setPhotoState();
    });
  }

  ngAfterViewInit() {
    this.setParams();
  }

  getImage() {
    this.imageService.getFile(this.loggedService.refId, "myProfileCardImage")
      .subscribe({
        next: (res) => {
          if (res['result'] != "NONE") {
            this.imageService.name = res['result'];
          } else {
            this.imageService.name = "";
          }
          return this.imageService.name;
        }
      });
  }

  setPhotoState() {
    if (this.imageService.name == null || this.imageService.name == undefined || this.imageService.name == "") {
      this.hasImageOnDB = false;
      this.imageService.path = "../../../assets/profile_picture_none.jpg";
      this.profile_image_view.nativeElement.src = "../../../assets/profile_picture_none.jpg";
    } else {
      this.hasImageOnDB = true;
      this.imageService.path = this.image_root_path + this.imageService.name;
      this.profile_image_view.nativeElement.src = this.image_root_path + this.imageService.name;
    }
  }

  ngOnInit() {
    this.getAllOthers();
  }

  getAllOthers() {
    this.yetki = this.loggedService.yetki;
    this.phone = this.loggedService.phone;
    this.email = this.loggedService.email;
    this.point = this.loggedService.point;
    this.name = this.loggedService.name;
    this.surname = this.loggedService.surname;
    this.nickname = this.loggedService.nickname;
    this.howManyDays = this.loggedService.howManyDays;

    this.isVerifiedText = this.loggedService.isVerified;
    if (this.loggedService.isVerified == "Unverified") {
      this.isVerified = false;
    } else if (this.loggedService.isVerified == "Verified") {
      this.isVerified = true;
      this.link = "http://localhost:4200/ref_link/" + this.ref_link;
      //this.link = "http://localhost:8080/api/signup/"+this.ref_link;
    }else{
      this.isVerifiedText="Unverified";
      this.isVerified = false;
    }

    this.isVerified = this.loggedService.isVerified;
    this.birthDay = this.loggedService.birthDay;
    this.generation = this.loggedService.generation;
    this.ref_link = this.loggedService.refLink;
    this.city = this.loggedService.city;
    this.isGhost = this.loggedService.isGhost;
  }

  deleteImage(event: any) {
    this.imageService.deleteFile(this.loggedService.refId, "myProfileCardImage")
      .subscribe({
        next: (res) => {
          this.hasImageOnDB = false;
          this.imageService.path = "../../../assets/profile_picture_none.jpg";
          this.imageService.name = "";
          this.profile_image_view.nativeElement.src = "../../../assets/profile_picture_none.jpg";
        }
      });
  }

  processFile(imageInput: any) {
    var file: File = imageInput.files[0];
    if (this.hasImageOnDB) {
      const anotherPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.deleteImage(null);
          resolve('this is a promise');
        }, 3000);
      });
      anotherPromise.then((value) => {
        console.log(value);
        this.imageService.sendFile(file, this.loggedService.refId, "myProfileCardImage")
          .subscribe({
            next: (res) => {
              var pieces_res = res['result'].split("/");
              var last_piece = pieces_res[pieces_res.length - 1];
              this.imageService.path = res['result'];
              this.imageService.name = last_piece;
              this.hasImageOnDB = true;
              var path = URL.createObjectURL(file);
              this.profile_image_view.nativeElement.src = path;
            }
          });

      });
    } else {
      this.imageService.sendFile(file, this.loggedService.refId, "myProfileCardImage")
        .subscribe({
          next: (res) => {
            var pieces_res = res['result'].split("/");
            var last_piece = pieces_res[pieces_res.length - 1];
            this.imageService.path = res['result'];
            this.imageService.name = last_piece;
            this.hasImageOnDB = true;
          }
        });
    }
    this.reader.readAsDataURL(file);
    var path = URL.createObjectURL(file);
    this.profile_image_view.nativeElement.src = path;
  }

  sendVerifyRequest() {
    if (this.isVerified == false) {
      this.loggedService.sendVerifyingRequest(this.loggedService.email)
        .subscribe({
          next: (res) => {
            console.log(res);
          }
        });
    }
  }

  refreshVerifyStatus() {

    const anotherPromise = new Promise((resolve, reject) => {
      //setTimeout(() => {
        this.loggedService.getVerificationStatus(this.loggedService.email).subscribe({
          next: (res) => {
            this.loggedService.isVerified = res.status;
            this.loggedService.point = res.points;
            console.log(res);
          }
        });
        resolve('this is a promise');
      //}, 1000);
    });
    anotherPromise.then((value) => {
      //check the status of verification and update interface
      setTimeout(() => {
      this.point = this.loggedService.point;
      this.isVerifiedText = this.loggedService.isVerified;
      if (this.loggedService.isVerified == "Unverified") {
        this.isVerified = false;
        //this.router.navigate(['my_profile']);
      } else if (this.loggedService.isVerified == "Verified") {
        this.isVerified = true;
        //ref_link/:ref_id_for_link
        this.link = "http://localhost:4200/ref_link/" + this.ref_link;
        //this.router.navigate(['my_profile']);
      } else {
        this.loggedService.isVerified = "Unverified";
        this.isVerified = false;
      }

      console.log(value);
    }, 1000);
      
    });







    /*
        //http://localhost:8080/api/signup/+reflşnk
        //send and update verify status
        this.loggedService.getVerificationStatus(this.loggedService.email).subscribe({
          next: (res) => {
            this.loggedService.isVerified = res.status;
            this.loggedService.point = res.points;
            //alert(this.loggedService.point);
            console.log(res);
          }
        });
        //check the status of verification and update interface
        this.point = this.loggedService.point;
        this.isVerifiedText = this.loggedService.isVerified;
       
        if (this.loggedService.isVerified == "Unverified") {
          this.isVerified = false;
          //this.router.navigate(['my_profile']);
        } else if (this.loggedService.isVerified == "Verified") {
          this.isVerified = true;
          //ref_link/:ref_id_for_link
          this.link = "http://localhost:4200/ref_link/"+this.ref_link;
          //this.router.navigate(['my_profile']);
        }else{
          this.loggedService.isVerified = "Unverified";
          this.isVerified = false;
        }*/

  }


}
