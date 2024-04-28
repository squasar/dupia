import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { ImageService } from 'src/app/compounds/my-profile-card/image.service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/models/user/user.service';

const baseUrl = 'http://localhost:8080/api/users';
const getLatestPostIdUrl = 'http://localhost:8080/api/posts/getLatestPostsId';

//const post_img_root_path = "localhost/dupia/angRes/backend_two/views/images/postAttachments/";


class Post {
    post_ref_id: string = "init";
    owner_ref_id: string = "init";
    content: string = "";
    file_path: string = "init";

    total_likes: number = 0;
    all_likes: string[] = [];

    total_comments: number = 0;
    all_comments: Comment[] = [];

    total_shares: number = 0;
    all_shares: string[] = [];

    privacy_type: number = -1;

    constructor(privacy_choice_code: string) {
        this.privacy_type = parseInt(privacy_choice_code);
    }
}

class Comment extends Post {
    constructor(privacy_choice_code: string) {
        super(privacy_choice_code);
    }
}

class MUser{
    name="";
    ref_id="";
    surname="";
    profile_image_path="";
    constructor(){}
}

@Injectable({
    providedIn: 'root'
})
export class ManagePostsService {

    //currentPost = this.socket.fromEvent<Post>('post');
    //documents = this.socket.fromEvent<string[]>('documents');

    postChanged: EventEmitter<any> = new EventEmitter();
    postStatus: any;
    m_userChanged: EventEmitter<any> = new EventEmitter();
    m_userStatus: any;

    set post(post: any) {
        this.postStatus = post;
        this.postChanged.emit(post);
    }
    get post(): any {
        return this.postStatus;
    }
    set m_user(m_user: any) {
        this.m_userStatus = m_user;
        this.m_userChanged.emit(m_user);
    }
    get m_user(): any {
        return this.m_userStatus;
    }


    allPosts = this.socket.fromEvent<Post[]>('allposts');
    allMyPosts = this.socket.fromEvent<Post[]>('getallmyposts');

    constructor(private socket: Socket, private http: HttpClient, private loggedUser: UserService, private imageService:ImageService) {
        //this.getAllDocuments();
        this.socket.emit('getAllMyPosts', {
            owner_ref_id: this.loggedUser.refId,
        });
    }

    getIterator(post_ref_id: string): any {
        //alert("ref: "+post_ref_id+"   post val content: "+this.allMyPosts);
        var isFound = false;

        


        //return res[post_ref_id];
    
        /*this.post.total_likes = ress["likes"];
        this.post.total_comments = ress["comments"];
        this.post.total_shares = ress["shares"];
        alert(ress["likes"]);*/
             


        this.allMyPosts.subscribe((res: any) => {
            //do whatever u want
            //alert("ref: " + post_ref_id + "   post val len: " + res[post_ref_id].content);
            this.post = res[post_ref_id];

            var owner = new MUser();
            owner.ref_id = this.post.owner_ref_id;
            this.m_user = owner;

             


            this.imageService.getPostedFile(post_ref_id).subscribe({
                next: (respon: any) => {
                  //alert("   post_image_content: "+respon['result']);
                  //this.content_image.nativeElement.src=respon['result'];
                  this.post.file_path = respon['result'];
                }
              });


            //return res[post_ref_id];
        });

        /*this.allMyPosts.subscribe({
             
            next: (post:any) => {
                alert("ref: "+post_ref_id+"   post val len: "+post.length);
            }
        });*/




        /*this.allMyPosts.forEach( (value: Post[]) => {

            alert("ref: "+post_ref_id+"   post val len: "+value.length);


            for(var ind=0; ind<value.length ; ind++){
                if(value[ind].post_ref_id == post_ref_id){
                    isFound = true;
                    return value[ind];
                }
            }
            if(isFound == false){
                return false;
            }else{
                return true;
            }
        });*/
    }


    newPost(_owner_ref_id: string, _content: string, _privacy_type: string) {
        //req.owner_ref_id, req.content, req.privacy_type
        let _privacy_type_ = parseInt(_privacy_type);
        this.socket.emit('sendPost',
            {
                owner_ref_id: _owner_ref_id,
                content: _content,
                privacy_type: _privacy_type_
            });
        //this.socket.emit('getDoc', _id);

    }

    getMyPosts(_owner_ref_id: string) {
        var a = this.socket.emit('getMyPosts', { owner_ref_id: _owner_ref_id });

    }

    updatePostPrivacy(post_ref_id:string, privacy_type:number):any{
        this.socket.emit("updatePostPrivacy", {post_ref_id: post_ref_id, privacy_type:privacy_type});
    }

    getInfoAboutPost(post_ref_id:string):any{
        this.socket.emit("getStatOfPost", {post_ref_id: post_ref_id});
    }

    getIdOfLatestPost(_owner_ref_id: string): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.post<string>(`${getLatestPostIdUrl}`, { owner_ref_id: _owner_ref_id }, httpOptions);

    }

    /*
      getAllPosts() {
        //alert("getAllDocuments çalıştı1111!!");
        this.socket.emit('getAllDocs');
        //this.documents = JSON.parse(JSON.stringify(this.documents));
        //alert("getAllDocuments çalıştı2222!!  : "+this.documents.toArray()[0].id);
      }
    
      getPost(id: string) {
        this.socket.emit('getDoc', id);
        //alert("Getting ID SECOND: "+id);
      }
    
      newPost() {
        var _id = this.docId();
        this.socket.emit('addDoc', { id: _id, doc: '' });
        //this.socket.emit('getDoc', _id);
        return _id;
      }
    
      editPost(document: Document) {
        //alert("EDIT OPENED!!!");
        this.socket.emit('editDoc', document);
      }
    */
}


