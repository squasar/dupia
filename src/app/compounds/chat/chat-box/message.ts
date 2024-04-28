import { UserService } from "src/app/models/user/user.service";
import { ChatBoxArrangeService } from "./chat-box-arrange.service";

export class Message{//for the data
    msg_id=-1;
    isSent = false;
    isReceived = false;
    isSeen = -1;
    sender_name = "";
    /*senderName = "";
    senderSurname = "";
    senderNickname = "";*/
    sender_ref_id=""
    receiver_ref_ids="";
    isReceiverOnline=false;
    isHiddenActive= false;
    chat_id = "";
    content = "";
    date:any;
    constructor(/*sender_ref_link_id:string, account_owner_ref_link_id:string*/){
      this.msg_id=-1;
      /*if(account_owner_ref_link_id == sender_ref_link_id){
        this.isSent = true;
        this.isReceived = false;
      }else{
        this.isSent = false;
        this.isReceived = true;
      }*/
    }
    /*setName(){
      for(var i=0; i<this.loggedService.alt_members.length;i++){
        if(this.loggedService.alt_members[i].getRefIdForLink() == this.sender_ref_id){
          this.chatBoxService.senderName = this.loggedService.alt_members[i].name;
          this.chatBoxService.senderSurname = this.loggedService.alt_members[i].surname;
          this.chatBoxService.senderNickname = this.loggedService.alt_members[i].nickname;
          this.senderName = this.chatBoxService.senderName;
          this.senderSurname = this.chatBoxService.senderSurname;
          this.senderNickname = this.chatBoxService.senderNickname;
        }
      }
      for(var i=0; i<this.loggedService.ust_members.length;i++){
        if(this.loggedService.ust_members[i].getRefIdForLink() == this.sender_ref_id){
          this.chatBoxService.senderName = this.loggedService.ust_members[i].name;
          this.chatBoxService.senderSurname = this.loggedService.ust_members[i].surname;
          this.chatBoxService.senderNickname = this.loggedService.ust_members[i].nickname;
          this.senderName = this.chatBoxService.senderName;
          this.senderSurname = this.chatBoxService.senderSurname;
          this.senderNickname = this.chatBoxService.senderNickname;
        }
      }
    }*/
  }