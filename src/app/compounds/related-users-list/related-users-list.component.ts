import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUserService } from 'src/app/login/logged-user.service';
import { User } from 'src/app/models/user/user';
import {MatAccordion} from '@angular/material/expansion';
import { ManageVerificationService } from 'src/app/models/email/manage-verification.service';

@Component({
  selector: 'app-related-users-list',
  templateUrl: './related-users-list.component.html',
  styleUrls: ['./related-users-list.component.scss']
})
export class RelatedUsersListComponent {
  
  owner!:User ;

  sub_members_length = -1;

  sub_members:any[]=[{}];

  @ViewChild('sendMailButt') send_mail_button!: ElementRef;
  submitted!: boolean;

  

  /* 
  res.status(200).send({
        message: "SUCCESSFUL", 
        owner_name : user.getUser().name,
        owner_surname : user.getUser().surname,
        owner_email : user.getUser().email,
        owner_ref_id : user.getUser().ref_id,
        owner_isGhost : user.getUser().isGhost,
        owner_point : user.getPoint(),
        owner_rank : user.generation,
        owner_email: JSON.stringify(user.getUser().email),
        owner_ref_id: JSON.stringify(user.getUser().ref_id),
        childeren: JSON.stringify(childrens)
      });
  */

  constructor(private loggedUserService: LoggedUserService, private manageVerificationService: ManageVerificationService){
    this.owner = new User();
    this.setUser();
  }

  ngOnInit():void{

  }

  ngAfterViewInit() {
    this.send_mail_button.nativeElement.addEventListener('click', this.onSendVerificationMail.bind(this));
  }

  onSendVerificationMail(event:any){

    alert("Email : "+this.owner.email);

    this.manageVerificationService.sendVerificationMail(this.owner.email!)
      .subscribe({
        next: (res) => {
          this.manageVerificationService.data=res;
          this.submitted = true;
          if(res.message == "EmailSentWorked"){
            var result = res.isSent;
            if(result){
              alert("Email başarılı bir şekilde gönderildi");
            }
          }else{
            alert("Email gönderilirken bir sorun oluştu!");
          }
        },
        error: (e) => console.error(e)
      });

    console.log("Submitted Value : "+this.submitted);
  }

  setUser(){
    this.owner.ref_id = this.loggedUserService.data.owner_ref_id;
    this.owner.ref_id_for_real = this.loggedUserService.data.owner_ref_id_for_real;
    this.owner.ref_id_for_point = this.loggedUserService.data.owner_ref_id_for_point;
    this.owner.ref_id_for_link = this.loggedUserService.data.owner_ref_id_for_link.replace('"','').replace('"','');
    this.owner.email = this.loggedUserService.data.owner_email;
    this.owner.point = this.loggedUserService.data.owner_point;
    this.owner.rank = this.loggedUserService.data.owner_rank;
    //this.owner.sub_members = new Array();
    this.owner.sub_members = JSON.parse(this.loggedUserService.data.childeren);
    this.sub_members_length = JSON.parse(this.loggedUserService.data.childeren).length;
    //arrange sub members by only ranking and their parent ids. (the top id is the owner's id that parent id is not set here)
    /*var first_list = [];
    for(var ind=0; ind<this.sub_members_length; ind++){
      if(this.owner.sub_members![ind].ref_id_for_point == this.owner.ref_id){
        first_list.push();
      }
    }*/





    /*for(var ind=0; ind<this.sub_members_length; ind++){
      var connection = {SOURCE:this.owner.ref_id, VALUE:this.owner.sub_members}
      if(this.sub_members.indexOf(connection)<0){
        this.sub_members.push(connection);
      }
    }*/
  }

}


