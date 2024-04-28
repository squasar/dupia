import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { DocumentService } from '../document.service';

import { Document } from '../document.model';

//import 'rxjs/add/operator/map';
import { map, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  //documents: Observable<string[]>;
  all_documents: Observable<Document[]>;
  //current_document_id: string;
  current_document:Observable<Document>;
  //currentDoc: string="";
  private _docSub?: Subscription;
  //doc_ids:string[];
  allDocs:Document[];
  currDoc:Document;
  docId:string="";

  constructor(private documentService: DocumentService) { 
    //this.current_document_id = "";
    this.current_document=new Observable<Document>;
    this.all_documents = new Observable<Document[]>();
    this._docSub = new Subscription();
    //this.documentService.getAllDocuments();
    //this.doc_ids = new Array<string>();
    this.allDocs = new Array<Document>();
    this.currDoc = new Document();
  }

  arrangeAllNotes(){
    this.documentService.getAllDocuments();
    
    this.all_documents = this.documentService.all_documents;
    this.all_documents.subscribe(event => this.allDocs = event/*this.copyInside(event)*//*alert(JSON.stringify(event))*/);
  }


  ngOnInit(): void {
    //this.documents = this.documentService.documents;
    //this.documentService.getAllDocuments();
    
    //this.all_documents = this.documentService.all_documents;
    //this.all_documents.subscribe(event => this.allDocs = event/*this.copyInside(event)*//*alert(JSON.stringify(event))*/);
    this.arrangeAllNotes();


    this.current_document = this.documentService.currentDocument;
    //this.current_document.subscribe(event => this.currDoc = event/*this.copyInside(event)*//*alert(JSON.stringify(event))*/);

    
    //this.documentService.currentDocument.subscribe(doc => this.current_document.id = doc.id);
    //this.documentService.currentDocument.subscribe(doc => this.current_document.doc = doc.doc);
    
    this._docSub = this.documentService.currentDocument.subscribe(doc => this.currDoc = doc);
    //alert(JSON.stringify(this.allDocs));
    //this.docId = this.current_document.id;
  }
  ngOnDestroy(): void {
    this._docSub?.unsubscribe();
  }

  getKeys(obj:any){
    return Object.keys(obj);
  }

  /*copyInside(all:any){
    alert(JSON.stringify(all["dj8yV"]));
    //alert(JSON.stringify(JSON.parse(JSON.stringify(all))["dj8yV"]));
    
    for(var docId of Object.keys(all)){
      var _temp = new Document();
      _temp.id = docId;
      _temp.doc = all[_temp.id];
      //this.allDocs.push(_temp);
    }*/
    /*for(var i=0; i<all.length; i++){
      this.allDocs.push(all[i]);
    }*/

  //}

  loadDoc(/*id: string*/id:any) {
    //alert("Getting ID: "+JSON.stringify(this.current_document));
    this.documentService.getDocument(id);
    //alert("loadDoc Works11111");
    //this.documentService.getAllDocuments();
    //alert("loadDoc Works22222");
  }

  listAllDocs(){
    //this.documentService.getAllDocuments();
  }


  newDoc() {
    var id = this.documentService.newDocument();
    //alert("newDoc çalıştı...");
    this.arrangeAllNotes();
    //this.loadDoc(id);
  }

}
