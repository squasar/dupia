import { Component } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/models/user/user.service';

@Component({
  selector: 'app-related-user',
  templateUrl: './related-user.component.html',
  styleUrls: ['./related-user.component.scss']
})
export class RelatedUserComponent {

  static isWorked=false;

 

  sub_net!: any[];//this.userService.childeren
  top_net!: any[];//this.userService.high

  alt_users:User[]=[];
  ust_users:User[]=[];


  setAll() {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.getAllOthers();;
        resolve('this is a promise');
      }, 1000);
    });
    myPromise.then((value) => {
      this.setParams();
    });
  }


  constructor(private loggedService: UserService) {
      this.setAll();
      RelatedUserComponent.isWorked = true;
  }

  ngAfterViewInit() {
    if(!RelatedUserComponent.isWorked){
      this.setAll();
      RelatedUserComponent.isWorked = true;
    }
  }


  setParams() {
    for (var ind = 0; ind < this.loggedService.alt_members.length; ind++) {
      var user = new User();
      user.name = this.loggedService.alt_members[ind].name;
      user.surname = this.loggedService.alt_members[ind].surname;
      user.nickname = this.loggedService.alt_members[ind].nickname;
      user.photo = this.loggedService.alt_members[ind].photo;
      if(user.photo != undefined && user.photo != null && user.photo != ""){
        var prefix="http://localhost:8090/dupia/angRes/backend_two/views/images/profilePics/";
        user.photo = prefix+user.photo;
      }else{
        user.photo = "http://localhost:4200/assets/profile_picture_none.jpg"
      }
      user.isGhost = this.loggedService.alt_members[ind].isGhost;
      user.city = this.loggedService.alt_members[ind].city;
      user.phone = this.loggedService.alt_members[ind].phone;
      user.birth_day = this.loggedService.alt_members[ind].birthDay;
      user.point = this.loggedService.alt_members[ind].point;
      user.generation = this.loggedService.alt_members[ind].generation;
      this.alt_users.push(user);
    }
    for (var ind = 0; ind < this.loggedService.ust_members.length; ind++) {
      var user = new User();
      user.name = this.loggedService.ust_members[ind].name;
      user.surname = this.loggedService.ust_members[ind].surname;
      user.nickname = this.loggedService.ust_members[ind].nickname;
      user.photo = this.loggedService.ust_members[ind].photo;
      if(user.photo != undefined && user.photo != null && user.photo != ""){
        var prefix="http://localhost:8090/dupia/angRes/backend_two/views/images/profilePics/";
        user.photo = prefix+user.photo;
      }else{
        user.photo = "http://localhost:4200/assets/profile_picture_none.jpg"
      }
      user.isGhost = this.loggedService.ust_members[ind].isGhost;
      user.city = this.loggedService.ust_members[ind].city;
      user.phone = this.loggedService.ust_members[ind].phone;
      user.birth_day = this.loggedService.ust_members[ind].birthDay;
      user.point = this.loggedService.ust_members[ind].point;
      user.generation = this.loggedService.ust_members[ind].generation;
      this.ust_users.push(user);
    }

  }



  getAllOthers() {
    this.sub_net = this.loggedService.childeren.split("*");
    this.top_net = this.loggedService.high.split("*");
    this.sub_net.pop();
    this.top_net.pop();
    for (var ind = 0; ind < this.sub_net.length; ind++) {
      this.loggedService.addToAltMembers(this.sub_net[ind]);
    }
    for (var ind = 0; ind < this.top_net.length; ind++) {
      this.loggedService.addToUstMembers(this.top_net[ind]);
    }
  }

  ngOnInit() {
    if(!RelatedUserComponent.isWorked){
      this.setAll();
      RelatedUserComponent.isWorked = true;
    }
  }



}
