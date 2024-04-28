import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserService } from 'src/app/models/user/user.service';

import { FriendListItemModel } from './friend-list-item-model';

@Injectable({
  providedIn: 'root'
})
export class FriendChatService {
  sub_net!: any[];//this.userService.childeren
  top_net!: any[];//this.userService.high
  

  //currentDocument = this.socket.fromEvent<Document>('document');
  currentFriendListItem = this.socket.fromEvent<FriendListItemModel>('friendlistitem');

  //all_documents = this.socket.fromEvent<Document[]>('alldocuments');
  all_friend_list_items = this.socket.fromEvent<FriendListItemModel[]>('chatFriends');

  constructor(private socket: Socket, private loggedService: UserService) {
    //this.loggedService.alt_members[ind].name;
    //this.loggedService.ust_members[ind].name;
    //this.loggedService.ust_members[ind].refId;
  }


  /*getAllDocuments() {
    this.socket.emit('getAllDocs');
  }*/
  getAllFriendChatListItems() {
    //including defining chat ids
    this.sub_net = this.loggedService.childeren.split("*");
    this.top_net = this.loggedService.high.split("*");

    //alert("TOP NET: "+this.top_net);
    //this.sub_net.pop();
    this.sub_net.splice(this.sub_net.length - 1, 1);
    //this.top_net.pop();
    this.top_net.splice(this.top_net.length - 1, 1);

    //alert("TOP NET NEW: "+this.top_net);

    //this.loggedService.addToAltMembers(this.sub_net[ind]);


    /*var all_related_ids = "";
    alert("Alt length : " + this.loggedService.alt_members.length);
    for (var ind = 0; ind < this.loggedService.alt_members.length; ind++) {
      all_related_ids = all_related_ids + this.loggedService.alt_members[ind].refId + ",";
    }
    alert("Alt length : " + this.loggedService.ust_members.length);
    for (var ind = 0; ind < this.loggedService.ust_members.length; ind++) {
      all_related_ids = all_related_ids + this.loggedService.ust_members[ind].refId + ","
    }
    alert("IDS : " + all_related_ids);*/
    var all_related_ids = "";
    //alert("Alt length : " + this.sub_net.length);
    for (var ind = 0; ind < this.sub_net.length; ind++) {
      all_related_ids = all_related_ids + this.sub_net[ind] + ",";
    }
    //alert("Alt length : " + this.top_net.length);
    for (var ind = 0; ind < this.top_net.length; ind++) {
      all_related_ids = all_related_ids + this.top_net[ind] + ",";
    }
    //alert("IDS : " + all_related_ids);



    this.tryToConnect(all_related_ids);




    //this.socket.emit('getAllFriendsChatList');
  }

  /*getDocument(id: string) {
    this.socket.emit('getDoc', id);
  }*/
  getFriendChatListItem(id: string) {
    this.socket.emit('getFriendChatList', { id: id });
  }

  tryToConnect(ref_link_ids:string) {
    const myPromise = new Promise((resolve, reject) => {
      //setTimeout(() => {
        this.socket.emit('createChatIds', { myRefId: this.loggedService.refLink, ids: ref_link_ids/*"all_related_ids"*/ });
        resolve('this is a promise');
      //}, 3000);
    });
    myPromise.then((value) => {
      //setTimeout(() => {
        this.socket.emit('getAllFriendsChatList', { myRefId: this.loggedService.refLink/* ,ids: all_related_ids*/ });
      //}, 1000);
    });

  }


}
