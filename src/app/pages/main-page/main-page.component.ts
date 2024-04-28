import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/models/user/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  
  masked_link!:string;

  constructor(private userService: UserService, private router:Router, private route: ActivatedRoute){
    
    var splitted = document.location.href.split("/ref_link/");
    //alert("splitted: "+document.location.href);
    if(!(splitted.length == undefined || splitted.length == null || splitted.length<=1)){
      this.masked_link = splitted[1];
      //alert("ID: "+this.masked_link);
      this.userService.setParentId(this.masked_link)
    }



  }

  ngAfterViewInit(){
    //alert(document.location.href);
  }

  ngOnDestroy(){
    //localStorage.setItem('isLoggedIn', 'false');
  }



}
