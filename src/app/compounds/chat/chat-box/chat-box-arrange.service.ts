import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserService } from 'src/app/models/user/user.service';
import { FriendListItemModel } from '../friend-chat-list/friend-list-item-model';
import { Message } from './message';


/*class MessageContext{// for the interface
  messages:Message[] = [];
  receiver_name:string = "";
  receiver_ref_ids="";
  isReceiverOnline=false;
  isHiddenActive= false;

  constructor(){
    
  }

  addMessage(msg:Message){
    this.messages.push(msg);
  }
}


class Box{
  items:MessageContext[] = [];
  _length = 5;

  setLength(len:number){
    this._length = len;
  }

  addItem(item:any){
    this.items.push(item);
    if(this.items.length > this._length ){
      this.items.splice(0, 1);
    }
  }

  removeItem(item:any){
    for(var ind=0; ind<this._length; ind++){
      if(this.items[ind] == item){
        this.items.splice(ind, 1);
      }
    }
  }

  getList(){
    return this.items;
  }
}*/




@Injectable({
  providedIn: 'root'
})
export class ChatBoxArrangeService {

  receiverChanged: EventEmitter<any> = new EventEmitter();
  receiverStatus: any;
  senderChanged: EventEmitter<any> = new EventEmitter();
  senderStatus: any;
  chatIdChanged: EventEmitter<any> = new EventEmitter();
  chatIdStatus: any;
  contentChanged: EventEmitter<any> = new EventEmitter();
  contentStatus: any;
  isSeenChanged: EventEmitter<any> = new EventEmitter();
  isSeenStatus: any;
  
  senderNameChanged: EventEmitter<any> = new EventEmitter();
  senderNameStatus: any;
  senderSurnameChanged: EventEmitter<any> = new EventEmitter();
  senderSurnameStatus: any;
  senderNicknameChanged: EventEmitter<any> = new EventEmitter();
  senderNicknameStatus: any;

  friendChanged: EventEmitter<any> = new EventEmitter();
  friendStatus: any;

  notifyChanged: EventEmitter<any> = new EventEmitter();
  notifyStatus: any;

  notifyHelperChanged: EventEmitter<any> = new EventEmitter();
  notifyHelperStatus: any;

  set senderName(senderName:any){
    this.senderNameStatus = senderName;
    this.senderNameChanged.emit(senderName);
  }
  get senderName():any{
    return this.senderNameStatus;
  }

  set senderSurname(senderSurname:any){
    this.senderSurnameStatus = senderSurname;
    this.senderSurnameChanged.emit(senderSurname);
  }
  get senderSurname():any{
    return this.senderSurnameStatus;
  }

  set senderNickname(senderNickname:any){
    this.senderNicknameStatus = senderNickname;
    this.senderNicknameChanged.emit(senderNickname);
  }
  get senderNickname():any{
    return this.senderNicknameStatus;
  }


  set receiver(receiver:any){
    this.receiverStatus = receiver;
    this.receiverChanged.emit(receiver);
  }
  get receiver():any{
    return this.receiverStatus;
  }

  set sender(sender:any){
    this.senderStatus = sender;
    this.senderChanged.emit(sender);
  }
  get sender():any{
    return this.senderStatus;
  }
  set chat_id(id:any){
    this.chatIdStatus = id;
    this.chatIdChanged.emit(id);
  }
  get chat_id():any{
    return this.chatIdStatus;
  }
  set content(content:any){
    this.contentStatus = content;
    this.contentChanged.emit(content);
  }
  get content():any{
    return this.contentStatus;
  }
  set isSeen(isSeen:any){
    this.isSeenStatus = isSeen;
    this.isSeenChanged.emit(isSeen);
  }
  get isSeen():any{
    return this.isSeenStatus;
  }

  set isThereNotify(isThereNotify:any){
    this.notifyStatus = isThereNotify;
    this.notifyChanged.emit(isThereNotify);
  }
  get isThereNotify():any{
    return this.notifyStatus;
  }
  set notifyHelper(helper:any){
    this.notifyHelperStatus = helper;
    this.notifyHelperChanged.emit(helper);
  }
  get notifyHelper():any{
    return this.notifyHelperStatus;
  }

  set friend(friend:any){
    this.friendStatus = friend;
    this.friendChanged.emit(friend);
  }
  get friend():any{
    return this.friendStatus;
  }

  //currentDocument = this.socket.fromEvent<Document>('document');
  currenMessageItem = this.socket.fromEvent<Message>('currentchat');

  //all_documents = this.socket.fromEvent<Document[]>('alldocuments');
  all_chat_items = this.socket.fromEvent<Message[]>('allchats');

  all_chat_wo = this.socket.fromEvent<Message[]>('allchatswithoutchangingnotification');

  

  constructor(private socket: Socket, private loggedService: UserService) { 
  }

  //item.chat_id, item.u_ref_id
  getAllChatsWithotChangingNotify(chat_id:string, ref_link_id:string){
    this.m_receiver(ref_link_id);
    this.m_sender(this.loggedService.refLink);
    //this.setNotification(this.loggedService.refLink,ref_link_id);
    /*this.loggedService.alt_members[ind].getRefIdForLink();

    for(var i=0; i<this.loggedService.alt_members.length;i++){
      if(this.loggedService.alt_members[i].getRefIdForLink() == ref)
    }*/
    this.socket.emit('getAllChatsWithotChangingNotify', { chat_id: chat_id, owner_ref_link_id:this.loggedService.refLink });
  }

  getAllChats(chat_id:string, ref_link_id:string) {
    this.m_receiver(ref_link_id);
    this.m_sender(this.loggedService.refLink);
    this.setNotification(this.loggedService.refLink,ref_link_id);
    /*this.loggedService.alt_members[ind].getRefIdForLink();

    for(var i=0; i<this.loggedService.alt_members.length;i++){
      if(this.loggedService.alt_members[i].getRefIdForLink() == ref)
    }*/
    this.socket.emit('getAllChats', { chat_id: chat_id, owner_ref_link_id:this.loggedService.refLink });
  }

  setNotification(sender_link_id:string, receiver_link_id:string){
      
  }
  
  sendMsg(content:Message){
    var res = JSON.stringify(content);
    this.socket.emit('sendMsg', { msg_ob: res, owner_ref_link_id:this.loggedService.refLink });
  }

  m_receiver(ref_link_id:string){
    this.receiverStatus = ref_link_id;
    this.receiverChanged.emit(ref_link_id);
  }
  m_sender(ref_link_id:string){
    this.senderStatus = ref_link_id;
    this.senderChanged.emit(ref_link_id);
  }
  

}
