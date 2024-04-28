import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  currentDocument = this.socket.fromEvent<Document>('document');
  //documents = this.socket.fromEvent<string[]>('documents');
  all_documents = this.socket.fromEvent<Document[]>('alldocuments');

  constructor(private socket: Socket) { 
    //this.getAllDocuments();
  }


  getAllDocuments() {
    //alert("getAllDocuments çalıştı1111!!");
    this.socket.emit('getAllDocs');
    //this.documents = JSON.parse(JSON.stringify(this.documents));
    //alert("getAllDocuments çalıştı2222!!  : "+this.documents.toArray()[0].id);
  }

  getDocument(id: string) {
    this.socket.emit('getDoc', id);
    //alert("Getting ID SECOND: "+id);
  }

  newDocument() {
    var _id = this.docId();
    this.socket.emit('addDoc', { id: _id, doc: '' });
    //this.socket.emit('getDoc', _id);
    return _id;
  }

  editDocument(document: Document) {
    //alert("EDIT OPENED!!!");
    this.socket.emit('editDoc', document);
  }

  private docId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
