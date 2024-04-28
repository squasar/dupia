import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {

  document: Document;
  private _docSub: Subscription;

  constructor(private documentService: DocumentService) { 
    this.document = new Document();
    this._docSub = new Subscription();
  }


  ngOnInit(): void {
    this._docSub = this.documentService.currentDocument.pipe(
      startWith({ id: '', doc: 'Select an existing document or create a new one to get started' })
    ).subscribe(document=>this.document = document);/*document=>{ this.document.id=document.id; this.document.doc=document.doc; });*///subscribe(document => /*this.document = document*//*alert("HOLA! : "+JSON.stringify(document))*/);
  }

  ngOnDestroy(): void {
    this._docSub?.unsubscribe();
  }

  editDoc() {
    //alert("HOLAAAAA!!!!!  :  "+JSON.stringify(this.document));
    this.documentService.editDocument(this.document);
  }

  getContent(){
    return this.document;
  }

}
