import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DocumentService } from 'src/app/models/socket-example/document.service';

//import { Document } from '../document.model';
import { FriendListItemModel } from './friend-list-item-model';

//import 'rxjs/add/operator/map';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { FriendChatService } from './friend-chat.service';
import { ChatBoxArrangeService } from '../chat-box/chat-box-arrange.service';
import { Message } from '../chat-box/message';
import { UserService } from 'src/app/models/user/user.service';
import { ListEventEmitterService } from '../chat/list-event-emitter.service';


@Component({
  selector: 'app-friend-chat-list',
  templateUrl: './friend-chat-list.component.html',
  styleUrls: ['./friend-chat-list.component.scss']
})
export class FriendChatListComponent implements OnInit, OnDestroy{

  //all_documents: Observable<Document[]>;
  all_friends: Observable<FriendListItemModel[]>;

  choosen_chat_content:Observable<Message[]>;

  //current_document:Observable<Document>;
  current_friend:Observable<FriendListItemModel>;
  
  //private _docSub?: Subscription;
  private _friendSub?: Subscription;

  private _chatSub?: Subscription;
  
  //allDocs:Document[];
  allFriends:FriendListItemModel[];

  choosenChatContent: Message[];
  
  //currDoc:Document;
  currFriend:FriendListItemModel;
  
  //docId:string="";
  friendId:string="";

  constructor(private chatService: FriendChatService, private chatBoxService:ChatBoxArrangeService
    ,private loggedUser:UserService, private eventEmitterService: ListEventEmitterService/*private documentService: DocumentService*/) { 

    //this.current_document=new Observable<Document>;
    this.current_friend=new Observable<FriendListItemModel>;

    //this.all_documents = new Observable<Document[]>();
    this.all_friends = new Observable<FriendListItemModel[]>();

    this.choosen_chat_content = new Observable<Message[]>();


    
    //this._docSub = new Subscription();
    this._friendSub = new Subscription();
    this._chatSub = new Subscription();



    //this.allDocs = new Array<Document>();
    this.allFriends = new Array<FriendListItemModel>();

    this.choosenChatContent = new Array<Message>();
    
    //this.currDoc = new Document();
    this.currFriend = new FriendListItemModel();
  }

  arrangeAllNotes(){
    //this.documentService.getAllDocuments();
    this.chatService.getAllFriendChatListItems();
    
    //this.all_documents = this.documentService.all_documents;
    this.all_friends = this.chatService.all_friend_list_items;

    //this.all_documents.subscribe(event => this.allDocs = event);
    this.all_friends.subscribe(event => this.allFriends = event);


    

  }

  firstFunction(){
    this.ngOnInit();
    this.ngOnInit();
    this.ngOnInit();
  }


  ngOnInit(): void {
    this.arrangeAllNotes();

    //this.current_document = this.documentService.currentDocument;
    this.current_friend = this.chatService.currentFriendListItem;
    
    //this._docSub = this.documentService.currentDocument.subscribe(doc => this.currDoc = doc);
    this._friendSub = this.chatService.currentFriendListItem.subscribe(doc => this.currFriend = doc);

    this._chatSub = this.chatBoxService.all_chat_wo.subscribe(event=>this.choosenChatContent=event);


    /*if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeFirstComponentFunction.subscribe((name:string) => {    
        this.firstFunction();    
      });    
    }*/

    





  }

  ngOnDestroy(): void {
    //this._docSub?.unsubscribe();
    this._friendSub?.unsubscribe();
    this._chatSub?.unsubscribe();
  }

  getKeys(obj:any){
    
    //return Object.keys(obj);
    //var items : FriendListItemModel[] = [];
    var m_items : FriendListItemModel[] = [];
    var real_items = obj.friends;
    
    //var thereNotify=false;

    for(var ind=0;ind<real_items.length; ind++){
      var item = new FriendListItemModel();
      item.chat_id = real_items[ind].chat_id;
      item.u_name = real_items[ind].u_name;
      item.u_surname = real_items[ind].u_surname;
      item.u_nickname = real_items[ind].u_nickname;
      item.pp_path = real_items[ind].pp_path;
      item.u_ref_id = real_items[ind].u_ref_id;
      item.hasNotification = real_items[ind].hasNotification;

      this.chatBoxService.notifyHelper = false;
      this.chatBoxService.isThereNotify = false;

      
      //this.getMessages(item);
      
      //this.choosen_chat_content.subscribe(event=>this.choosenChatContent=event);
      //var thereNotify = false;
      //for(var msg of this.choosen_chat_content)

     
      
      
      if(real_items[ind].hasNotification == 0){
        item.hasNotification = 0;
        item.isVisible = false;
      }else{
        item.hasNotification = 1;
        item.isVisible = true;
      }
      //item.hasNotification = real_items[ind].hasNotification;
      m_items.push(item);
    }
    return Object.values(m_items);
    
    
    /*
    var vals : string[]=[];
    var items = obj.friends;
    items[0].chat_id;
    for(var ind=0;ind<items.length; ind++){
      vals.push(items[ind].chat_id);
    }
    return Object.values(vals/*items*//*obj.friends*//*);*/
  }

  /*loadDoc(id:any) {
    //this.documentService.getDocument(id);
    this.chatService.getFriendChatListItem(id);
  }*/

  getMessages(item:any){

    const anotherPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        //this.chatBoxService.getAllChatsWithotChangingNotify(item.chat_id, this.loggedUser.refLink);
      }, 2000);
        resolve('this is a promise');

      
    });
    anotherPromise.then((value) => {
      setTimeout(() => {
      
      
      this.choosen_chat_content.subscribe({
        next: (res) => {
          for(var ind=0; ind<res.length;ind++){
            if(this.chatBoxService.notifyHelper==false && res[ind].isSeen==0){
              this.chatBoxService.notifyHelper=true;
              this.chatBoxService.isThereNotify=true;
            }
          }
          
        }
      });
    }, 2000);

    });



    
      
  }


  loadDoc(friend:FriendListItemModel){
    //alert(friend.u_ref_id);
    /*alert(friend.u_name);*/
    //this.chatBoxService.receiver(friend.u_ref_id);
    
    //object.style.visibility = "visible|hidden|collapse|initial|inherit"
    //alert("Hiiiiii");


    //friend.hasNotification = 0;
    
    //alert("BEFORE: "+friend.hasNotification);

    friend.hasNotification = 0;
    friend.isVisible = false;

    alert("BEFORE: "+friend.isVisible);

    this.ngOnInit();
    this.ngOnInit();
    this.ngOnInit();

    this.chatBoxService.getAllChats(friend.chat_id, friend.u_ref_id);
    
    //this.chatBoxService.friend = friend;
    //friend.hasNotification = 0;
    //friend.isVisible = false;







    /*this.chatBoxService.senderName = friend.u_name;
    this.chatBoxService.senderSurname = friend.u_surname;
    this.chatBoxService.senderNickname = friend.u_nickname;*/
    
    
    

    
    
  }

  listAllDocs(){
  }


  /*newDoc() {
    var id = this.documentService.newDocument();
    this.arrangeAllNotes();
  }*/


}
