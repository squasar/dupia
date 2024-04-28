import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/user/user";

const baseUrl = 'http://localhost:8080/api/users/updateImage';
const getbaseUrl = 'http://localhost:8080/api/users/getImage';

const phpUrl = "http://localhost:8090/dupia/angRes/backend_two/app/controllers/sub_dependencies/fileSaver.php"
const phpPostImageUrl = "http://localhost:8090/dupia/angRes/backend_two/app/controllers/sub_dependencies/specFileSaver.php"

@Injectable({
    providedIn: 'root'
  })


  

export class ImageService {

  imagePathChanged: EventEmitter<any> = new EventEmitter();
  imagePathstatus: any;

  nameChanged: EventEmitter<any> = new EventEmitter();
  nameStatus: any;

  set name(name:any){
    this.nameStatus = name;
    this.nameChanged.emit(name);
  }
  get name():any{
    return this.nameStatus;
  }


  set path(path:any){
    this.imagePathstatus = path;
    this.imagePathChanged.emit(path);
  }
  get path():any{
    return this.imagePathstatus;
  }

    

    constructor(private http: HttpClient) {}


    sendFile(image: File, id:string, context:string){
      const formData = new FormData();
      //alert("IMAGE IS SENDING.... : "+image.toString());
      formData.append('file', image);
      formData.append('context', context);
      formData.append('my_id', id);
      formData.append('command', "upload");
      return this.http.post<any>(`${phpUrl}`, formData);
    }
    deleteFile(id:string, context:string){
      const formData = new FormData();
      formData.append('file', "");
      formData.append('context', context);
      formData.append('my_id', id);
      formData.append('command', "delete");
      return this.http.post<any>(`${phpUrl}`, formData);
    }
    changeFile(image: File, id:string, context:string){
      const formData = new FormData();
      formData.append('file', image);
      formData.append('context', context);
      formData.append('my_id', id);
      formData.append('command', "change");
      return this.http.post<any>(`${phpUrl}`, formData);
    }
    getFile(id:string, context:string){
      const formData = new FormData();
      formData.append('file', "");
      formData.append('context', context);
      formData.append('my_id', id);
      formData.append('command', "get");
      return this.http.post<any>(`${phpUrl}`, formData);
    }

    postFile(id:string, image:File){
      const formData = new FormData();
      formData.append('file', image);
      formData.append('context', "");
      formData.append('my_id', id);
      formData.append('command', "postImage");
      //alert("ID : "+id);
      return this.http.post<any>(`${phpPostImageUrl}`, formData);
    }

    getPostedFile(related_post_id:string){
      const formData = new FormData();
      formData.append('file', "setted");
      formData.append('context', "context");
      formData.append('my_id', related_post_id);
      formData.append('command', "getPostedFile");
      return this.http.post<any>(`${phpPostImageUrl}`, formData);

    }

    getFileForPost(related_user_id:string){
      const formData = new FormData();
      formData.append('file', "setted");
      formData.append('context', "context");
      formData.append('my_id', related_user_id);
      formData.append('command', "getFileForPost");
      return this.http.post<any>(`${phpUrl}`, formData);

    }

}
