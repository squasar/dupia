import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpHeaders } from '@angular/common/http';
import { LoggedUserService } from 'src/app/login/logged-user.service';

import { RelatedUsersService } from './related-users.service';
import { MyProfilePageComponent } from 'src/app/pages/my-profile-page/my-profile-page.component';
import { RelatedUserComponent } from 'src/app/compounds/related-user/related-user.component';

//const baseUrl = 'http://localhost:8080/dupia/angRes/backend/api/user';
const baseUrl = 'http://localhost:8080/api/users';
const loginUrl = 'http://localhost:8080/login';

const signupBaseUrl = "http://localhost:8080/api/signup";
const getSignupRefIdUrl = "http://localhost:8080/api/getSignupParentRefId";
const createUserUrl = "http://localhost:8080/api/createUser";
const getVerificationStatus = "http://localhost:8080/api/verifystatusget";
const verifyingUserBaseUrl = "http://localhost:8080/api/verifyUser";
const getUserByRefLinkIdUrl = "http://localhost:8080/api/users/getByRefLinkId";
const getUserByRefIdUrl = "http://localhost:8080/api/users/getByRefId";


/* 
id?: number | null;
    name?: string | null;
    surname?: string | null;
    email?: string | null;
    pass?: string | null;
    password_once_again?:string | null;
    photo?:any | null;
    phone?:string | null;
    point?:string | null;
    city?:string | null;
    yetki?:string | null;
    birth_day?:Date|null;
    ref_id_for_real?:string|null;
    ref_id_for_point?:string|null;
*/


@Injectable({
  providedIn: 'root'
})
export class UserService extends LoggedUserService {

  alt_members: RelatedUsersService[] = [];
  ust_members: RelatedUsersService[] = [];

  cleanArr(arr: any[]) {
    var _len = arr.length;
    if (_len > 0) {
      for (var ind = 0; ind < _len; ind++) {
        arr.pop();
      }
    }
    return arr;
  }

  realLogout() {
    this.cleanArr(this.alt_members);
    this.alt_members = [];
    this.cleanArr(this.ust_members);
    this.ust_members = [];
    RelatedUserComponent.isWorked = false;
    this.logout();
  }

  addToAltMembers(ref_id_for_link: string) {

    var related_user_service = new RelatedUsersService();
    related_user_service.setRefIdForLink(ref_id_for_link);
    //this.cleanArr(this.alt_members);
    //send the request and set the parameters
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.getAuserByRefLinkId(ref_id_for_link)
          .subscribe({
            next: (res) => {
              related_user_service.isGhost = res.isGhost;
              related_user_service.birthDay = res.birth_day;
              related_user_service.generation = res.generation;
              related_user_service.point = res.point;
              related_user_service.photo = res.photo;
              related_user_service.name = res.name;
              related_user_service.surname = res.surname;
              related_user_service.nickname = res.nickname;
              related_user_service.phone = res.phone;
              related_user_service.city = res.city;
              related_user_service.refId = res.ref_id;
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
        if (this.alt_members[ind].getRefIdForLink() == related_user_service.getRefIdForLink()) {
          isExist = true;
          updatedIndis = ind;
        }
      }
      if (isExist) {
        //update
        this.alt_members[updatedIndis] = related_user_service;
      } else {
        //add
        this.alt_members.push(related_user_service);
      }
    });

  }


  addToUstMembers(ref_id_for_link: string) {
    var r_user_service = new RelatedUsersService();
    r_user_service.setRefIdForLink(ref_id_for_link);
    //this.cleanArr(this.ust_members);

    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        //send the request and set the parameters
        this.getAuserByRefLinkId(ref_id_for_link)
          .subscribe({
            next: (res) => {
              r_user_service.isGhost = res.isGhost;
              r_user_service.birthDay = res.birth_day;
              r_user_service.generation = res.generation;
              r_user_service.point = res.point;
              r_user_service.photo = res.photo;
              r_user_service.name = res.name;
              r_user_service.surname = res.surname;
              r_user_service.nickname = res.nickname;
              r_user_service.phone = res.phone;
              r_user_service.city = res.city;
              r_user_service.refId = res.ref_id;
            }
          }
          );
        resolve('this is a promise');
      }, 2000);
    });
    myPromise.then((value) => {
      //eğer dizi de ilgili eleman yoksa ekle, varsa güncelle
      var isExist = false;
      var updatedIndis = -1;
      
      for (var ind = 0; ind < this.ust_members.length; ind++) {
        if (this.ust_members[ind].getRefIdForLink() == ref_id_for_link) {
          isExist = true;
          updatedIndis = ind;
        }
      }
      if (isExist) {
        //update
        this.ust_members[updatedIndis] = r_user_service;
      } else {
        //add
        this.ust_members.push(r_user_service);
      }
    });
  }


  getAuserByRefLinkId(r_id_for_link: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post<User>(`${getUserByRefLinkIdUrl}`, {
      ref_id_for_link: r_id_for_link,
    }, httpOptions);

  }

  getAuserByRefId(r_id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post<User>(`${getUserByRefIdUrl}`, {
      ref_id: r_id,
    }, httpOptions);

  }


  userstatusChanged: EventEmitter<any> = new EventEmitter();
  userstatus: any;
  parent_id!: string;

  getParentId() {
    return this.parent_id;
  }

  setParentId(masked_id: string) {
    this.getSignupRefId(masked_id)
      .subscribe({
        next: (res) => {
          //alert("ACTUAL RESPONSE MAİL : "+res.message);
          this.parent_id = res.parent_id;
          this.setData(this.parent_id);
        },
        error: (e) => console.error(e)
      });
  }

  getData(): any {
    return this.userstatus;
  }
  setData(val: any) {
    this.userstatus = val;
    this.userstatusChanged.emit(val);
  }






  constructor(private http: HttpClient) {
    super();

  }

  createOrGet(data: User): Observable<any> {
    //return this.http.post(baseUrl, data);
    /*return this.http.get<User>(`${baseUrl}/${data.email}/${data.pass}/${data.name}/${data.surname}/${data.phone}/${data.yetki}
                                        /${data.birth_day}/${data.ref_id_for_real}`);*/
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<User>(`${createUserUrl}`, {
      email: data.email,
      pass: data.pass,
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      yetki: data.yetki,
      birth_day: data.birth_day,
      ref_id_for_real: data.ref_id_for_real
    }, httpOptions);

  }

  login(data: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<User>(`${loginUrl}`, { email: data.email, pass: data.pass }, httpOptions);
  }

  //post(data: Post)


  signupWithParent(masked_id_for_link: string): Observable<any> {
    return this.http.get<User>(`${signupBaseUrl}/${masked_id_for_link}`);
  }

  getSignupRefId(masked_id_for_link: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(`${getSignupRefIdUrl}`, { masked_id_for_link: masked_id_for_link }, httpOptions);
  }

  sendVerifyingRequest(email:string): Observable<any>{
    //const verifyingUserBaseUrl = "http://localhost:8080/api/verifyUser";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(`${verifyingUserBaseUrl}`, { email: email }, httpOptions);
  }

  getVerificationStatus(email:string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(`${getVerificationStatus}`, { email: email }, httpOptions);

  }


  /*
  post('http://localhost:3000/', {})
  */

  /*
  post("http://localhost:3000/login",{user: user,password: pass}, function(data){
            if(data === 'yes') {
                alert("login success");
              }
  */


  /*('https://reqres.in/api/posts', { title: 'Angular POST Request Example' }).subscribe(data => {
        this.postId = data.id;*/
  /*
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}?title=${title}`);
  }
*/

}
