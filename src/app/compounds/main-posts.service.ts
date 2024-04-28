import { Injectable } from '@angular/core';
import { ManagePostsService } from './manage-posts.service';

@Injectable({
  providedIn: 'root'
})
export class MainPostsService extends ManagePostsService {

  alt_posts: ManagePostsService[] = [];

  cleanArr(arr: any[]) {
    var _len = arr.length;
    if (_len > 0) {
      for (var ind = 0; ind < _len; ind++) {
        arr.pop();
      }
    }
    return arr;
  }
/*

  addToPosts(ref_id_for_link: string) {

    var related_post_service = new ManagePostsService();
    related_post_service.setRefIdForLink(ref_id_for_link);
    //this.cleanArr(this.alt_members);
    //send the request and set the parameters
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.getApostByRefLinkId(ref_id_for_link)
          .subscribe({
            next: (res) => {
              related_post_service.isGhost = res.isGhost;
              related_post_service.birthDay = res.birth_day;
              related_post_service.generation = res.generation;
              related_post_service.point = res.point;
              related_post_service.photo = res.photo;
              related_post_service.name = res.name;
              related_post_service.surname = res.surname;
              related_post_service.nickname = res.nickname;
              related_post_service.phone = res.phone;
              related_post_service.city = res.city;
              related_post_service.refId = res.ref_id;
            }
          }
          );
        resolve('this is a promise');
      }, 2000);
    });
    myPromise.then((value) => {
      var isExist = false;
      var updatedIndis = -1;
      
      for (var ind = 0; ind < this.alt_members.length; ind++) {
        if (this.alt_members[ind].getRefIdForLink() == related_post_service.getRefIdForLink()) {
          isExist = true;
          updatedIndis = ind;
        }
      }
      if (isExist) {
        //update
        this.alt_members[updatedIndis] = related_post_service;
      } else {
        //add
        this.alt_members.push(related_post_service);
      }
    });

  }







  constructor() { super(); }*/
}
