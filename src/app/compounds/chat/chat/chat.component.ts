import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

//import { Document } from '../document.model';
import { Message } from '../chat-box/message';

//import { DocumentService } from '../document.service';
import { ChatBoxArrangeService } from '../chat-box/chat-box-arrange.service';
import { UserService } from 'src/app/models/user/user.service';
import { ListEventEmitterService } from './list-event-emitter.service';

//import { FriendChatListComponent } from '../friend-chat-list/friend-chat-list.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  //document: Document;
  messages: Message[] = [];
  msg: Message;
  //private _docSub: Subscription;
  private _msgSub: Subscription;

  @ViewChild('myTextArea') text_area!: ElementRef;
  @ViewChild('messages') _mess!: ElementRef;
  @ViewChild('messageContainer') msg_container!: ElementRef;

  constructor(private chatBoxService: ChatBoxArrangeService, private loggedUserService: UserService, private eventEmitterService: ListEventEmitterService/*, private friendChatListComponent:FriendChatListComponent*/) {
    this.msg = new Message();
    this._msgSub = new Subscription();
  }

  ngOnInit(): void {
    this._msgSub = this.chatBoxService.all_chat_items.pipe(
    ).subscribe(document => this.messages = document)

    this.firstComponentFunction();

    /*this.friendChatListComponent.ngOnInit();
    this.friendChatListComponent.ngOnInit();
    this.friendChatListComponent.ngOnInit();*/
  }

  ngOnDestroy(): void {
    this._msgSub?.unsubscribe();
  }
  sendMessage() {
    this._mess.nativeElement.click();
    this.msg.content = this.text_area.nativeElement.value;
    this.msg.sender_ref_id = this.chatBoxService.sender;
    this.msg.chat_id = this.chatBoxService.chat_id;
    this.msg.receiver_ref_ids = this.chatBoxService.receiver;

    if (this.msg.content != "" && this.msg.content != null && this.msg.content != undefined) {

      this.sendMessageAndGetThem(this.msg);

      //this.chatBoxService.sendMsg(this.msg);
      //this.msg.content = "";

    }
    //this.chatBoxService.getAllChats(this.msg.chat_id, this.msg.receiver_ref_ids);

    
    //this.msg_container.nativeElement.scrollTop = this.msg_container.nativeElement.scrollHeight;


    this.firstComponentFunction();


    /*this.friendChatListComponent.ngOnInit();
    this.friendChatListComponent.ngOnInit();
    this.friendChatListComponent.ngOnInit();*/

  }

  sendMessageAndGetThem(m_msg: Message) {
    const myPromise = new Promise((resolve, reject) => {

      this.chatBoxService.sendMsg(m_msg);
      this.msg.content = "";
      resolve('this is a promise');

    });
    myPromise.then((value) => {
      setTimeout(() => {
        //this.msg.content = "";
        this.chatBoxService.getAllChats(m_msg.chat_id, m_msg.receiver_ref_ids);
        this.msg_container.nativeElement.scrollTop = this.msg_container.nativeElement.scrollHeight;
      }, 1000);
    });
  }



  loadDoc(message: Message) {
    this.chatBoxService.chat_id = message.chat_id;

    this.chatBoxService.friend.isVisible = false;

    this.firstComponentFunction();


    /*this.friendChatListComponent.ngOnInit();
    this.friendChatListComponent.ngOnInit();
    this.friendChatListComponent.ngOnInit();*/
  }

  editMessage() {
    /** if any key is pressed */
    //update the message as seen
    //...
    //this.chatBoxService.chat_id;
    this.chatBoxService.friend.isVisible = false;
    
  }


  firstComponentFunction(){    
    this.eventEmitterService.onFirstComponent();    
  }




}
