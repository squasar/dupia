import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  loggedUserstatusChanged: EventEmitter<any> = new EventEmitter();
  loggedUserstatus: any;

  isGhostChanged: EventEmitter<any> = new EventEmitter();
  isGhostStatus: any;

  nameChanged: EventEmitter<any> = new EventEmitter();
  nameUserstatus: any;

  surnameChanged: EventEmitter<any> = new EventEmitter();
  surnameUserstatus: any;

  
  emailChanged: EventEmitter<any> = new EventEmitter();
  emailUserstatus: any;

  photoChanged: EventEmitter<any> = new EventEmitter();
  photoUserstatus: any;

  pointChanged: EventEmitter<any> = new EventEmitter();
  pointUserstatus: any;

  generationChanged: EventEmitter<any> = new EventEmitter();
  generationUserstatus: any;

  yetkiChanged: EventEmitter<any> = new EventEmitter();
  yetkiUserstatus: any;

  isverifiedChanged: EventEmitter<any> = new EventEmitter();
  isverifiedUserstatus: any;

  phoneChanged: EventEmitter<any> = new EventEmitter();
  phoneUserstatus: any;

  birthdayChanged: EventEmitter<any> = new EventEmitter();
  birthdayUserstatus: any;

  nodidChanged: EventEmitter<any> = new EventEmitter();
  nodidUserstatus: any;

  howmanydaysChanged: EventEmitter<any> = new EventEmitter();
  howmanydaysUserstatus: any;

  nicknameChanged: EventEmitter<any> = new EventEmitter();
  nicknameUserstatus: any;

  refIdChanged: EventEmitter<any> = new EventEmitter();
  refIdUserstatus: any;

  cityChanged: EventEmitter<any> = new EventEmitter();
  cityUserstatus: any;

  refLinkChanged: EventEmitter<any> = new EventEmitter();
  refLinkUserstatus: any;

  sb_membersStatusChanged: EventEmitter<any> = new EventEmitter<any>();
  sb_members!: any;

  top_membersStatusChanged: EventEmitter<any> = new EventEmitter<any>();
  top_members!: any;

  /*
        
  
  */

  set isGhost(isGhost:any){
    this.isGhostStatus = isGhost;
    this.isGhostChanged.emit(isGhost);
  }
  get isGhost():any{
    return this.isGhostStatus;
  }

  set name(name:any){
    this.nameUserstatus = name;
    this.nameChanged.emit(name);
  }
  get name():any{
    return this.nameUserstatus;
  }

  set refLink(reflink:any){
    this.refLinkUserstatus = reflink;
    this.refLinkChanged.emit(reflink);
  }
  get refLink():any{
    return this.refLinkUserstatus;
  }

  set city(city:any){
    this.cityUserstatus = city;
    this.cityChanged.emit(city);
  }
  get city():any{
    return this.cityUserstatus;
  }

  set refId(refid:any){
    this.refIdUserstatus = refid;
    this.refIdChanged.emit(refid);
  }
  get refId():any{
    return this.refIdUserstatus;
  }

  set photo(photo:any){
    this.photoUserstatus = photo;
    this.photoChanged.emit(photo);
  }
  get photo():any{
    return this.photoUserstatus;
  }

  set nickname(nickname:any){
    this.nicknameUserstatus = nickname;
    this.nicknameChanged.emit(nickname);
  }
  get nickname():any{
    return this.nicknameUserstatus;
  }

  set howManyDays(howmanydays:any){
    this.howmanydaysUserstatus = howmanydays;
    this.howmanydaysChanged.emit(howmanydays);
  }
  get howManyDays():any{
    return this.howmanydaysUserstatus;
  }

  set nodId(nodid:any){
    this.nodidUserstatus = nodid;
    this.nodidChanged.emit(nodid);
  }
  get nodId():any{
    return this.nodidUserstatus;
  }

  set birthDay(birthDay:any){
    this.birthdayUserstatus = birthDay;
    this.birthdayChanged.emit(birthDay);
  }
  get birthDay():any{
    return this.birthdayUserstatus;
  }

  set phone(phone:any){
    this.phoneUserstatus = phone;
    this.phoneChanged.emit(phone);
  }
  get phone():any{
    return this.phoneUserstatus;
  }

  set isVerified(isVerified:any){
    this.isverifiedUserstatus = isVerified;
    this.isverifiedChanged.emit(isVerified);
  }
  get isVerified():any{
    return this.isverifiedUserstatus;
  }

  set yetki(yetki:any){
    this.yetkiUserstatus = yetki;
    this.yetkiChanged.emit(yetki);
  }
  get yetki():any{
    return this.yetkiUserstatus;
  }

  set generation(generation:any){
    this.generationUserstatus = generation;
    this.generationChanged.emit(generation);
  }
  get generation():any{
    return this.generationUserstatus;
  }


  set point(point:any){
    this.pointUserstatus = point;
    this.pointChanged.emit(point);
  }
  get point():any{
    return this.pointUserstatus;
  }

  set email(email:any){
    this.emailUserstatus = email;
    this.emailChanged.emit(email);
  }
  get email():any{
    return this.emailUserstatus;
  }
  
  set surname(surname:any){
    this.surnameUserstatus = surname;
    this.surnameChanged.emit(surname);
  }
  get surname():any{
    return this.surnameUserstatus;
  }





  /* 
  
  res.status(200).send({
        message: "SUCCESSFUL", 
        owner_name : user.getUser().name,
        owner_surname : user.getUser().surname,
        owner_email : user.getUser().email,
        owner_ref_id : user.getUser().ref_id,
        owner_ref_id_for_link: JSON.stringify(crypto.createHash('sha256').update(user.getUser().ref_id_for_link).digest('hex')),
        owner_isGhost : user.getUser().isGhost,
        owner_point : user.getPoint(),
        owner_rank : user.generation,
        owner_email: JSON.stringify(user.getUser().email),
        owner_ref_id: JSON.stringify(user.getUser().ref_id),
        childeren: JSON.stringify(childrens)
      });
  
  */

  constructor() { }
  get data(): any {
    return this.loggedUserstatus;
  }

  get childeren(): any {
    return this.sb_members;
  }



  set childeren(sub_net) {
    this.sb_members = sub_net;
    this.sb_membersStatusChanged.emit(sub_net);
    //var childeren_len = this.data.childeren.length;
    //for (var ind = 0; ind < childeren_len; ind++) {
    //  this.sb_members.push(this.data.childeren[ind]);
    //}
    //return this.sb_members;
  }


  get high(): any {
    return this.top_members;
  }



  set high(high_net:any) {
    this.top_members = high_net;
    this.top_membersStatusChanged.emit(high_net);
    //var childeren_len = this.data.childeren.length;
    //for (var ind = 0; ind < childeren_len; ind++) {
    //  this.sb_members.push(this.data.childeren[ind]);
    //}
    //return this.sb_members;
  }




  set data(val: any) {
    this.loggedUserstatus = val;
    this.loggedUserstatusChanged.emit(val);
  }






  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('userMail', '');
    //localStorage.setItem('id',"");
    localStorage.removeItem('token');
  }





}
