import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { ManageSessionService } from './session-management/manage-session.service';
import {MatSelectModule} from '@angular/material/select';

import {MatDatepickerModule} from '@angular/material/datepicker';
//import { MainPageComponent } from './pages/main-page/main-page.component';
//import { TimelinePageComponent } from './pages/timeline-page/timeline-page.component';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
//import { FooterComponent } from './compounds/footer/footer.component';
//import { MainHeaderComponent } from './compounds/main-header/main-header.component';
import {MatButtonModule} from '@angular/material/button';
//import { HorizontalLineComponent } from './compounds/horizontal-line/horizontal-line.component';
import {MatDialogModule ,MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
//import { LoginFormComponent } from './login/login-form/login-form.component';
//import {NgxMatDrmCountriesFlagsModule} from 'ngx-mat-drm-countries-flags';
import {NgxMatDrmCountriesFlagsModule} from '../../node_modules/ngx-mat-drm-countries-flags/src/lib/ngx-mat-drm-countries-flags.module';
//import { RelatedUsersListComponent } from './compounds/related-users-list/related-users-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
//import { DocumentListComponent } from './models/socket-example/document-list/document-list.component';
//import { DocumentComponent } from './models/socket-example/document/document.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ServiceWorkerModule, SwRegistrationOptions } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import { RegisterFormComponent } from './register/registerForm/register-form/register-form.component';
import { FooterComponent } from './compounds/footer/footer.component';
import { MainHeaderComponent } from './compounds/main-header/main-header.component';
import { HorizontalLineComponent } from './compounds/horizontal-line/horizontal-line.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RelatedUsersListComponent } from './compounds/related-users-list/related-users-list.component';
import { DocumentListComponent } from './models/socket-example/document-list/document-list.component';
import { DocumentComponent } from './models/socket-example/document/document.component';
import { TimelinePageComponent } from './pages/timeline-page/timeline-page.component';
import { ManageLanguageComponent } from './language-management/manage-language/manage-language/manage-language.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoggedInHeaderComponent } from './compounds/logged-in-header/logged-in-header.component';
import { FriendsListComponent } from './compounds/friends-list/friends-list.component';
import { CreatePostComponent } from './compounds/create-post/create-post.component';
import { InMessagingComponent } from './compounds/in-messaging/in-messaging.component';
import { PostListComponent } from './compounds/post-list/post-list.component';
import { PostItemComponent } from './compounds/post-item/post-item.component';
import { FriendsItemComponent } from './compounds/friends-item/friends-item.component';
import { InMessagingListComponent } from './compounds/in-messaging-list/in-messaging-list.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MyProfilePageComponent } from './pages/my-profile-page/my-profile-page.component';
import { NetworkPageComponent } from './pages/network-page/network-page.component';

import { AuthGuard } from './login/auth.guart';
import { MyProfileCardComponent } from './compounds/my-profile-card/my-profile-card.component';
import { RelatedUserComponent } from './compounds/related-user/related-user.component';
import { SendPostPanelComponent } from './compounds/send-post-panel/send-post-panel.component'; 

import { ReceivePostPanelComponent } from './compounds/receive-post-panel/receive-post-panel.component';
import { ChatComponent } from './compounds/chat/chat/chat.component';
import { ChatBoxComponent } from './compounds/chat/chat-box/chat-box.component';
import { FriendChatListComponent } from './compounds/chat/friend-chat-list/friend-chat-list.component';
import { ListEventEmitterService } from './compounds/chat/chat/list-event-emitter.service';
import { MainPageComponent } from './oldDupia/pages/main-page/main-page.component';
import { LoginPageComponent } from './oldDupia/pages/login-page/login-page.component';
import { SignupPageComponent } from './oldDupia/pages/signup-page/signup-page.component';
import { ForgotPasswordComponent } from './oldDupia/pages/forgot-password/forgot-password.component';



const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };





@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    MainPageComponent,
    FooterComponent,
    MainHeaderComponent,
    HorizontalLineComponent,
    LoginFormComponent,
    RelatedUsersListComponent,
    DocumentListComponent,
    DocumentComponent,
    TimelinePageComponent,
    ManageLanguageComponent,
    LoggedInHeaderComponent,
    FriendsListComponent,
    CreatePostComponent,
    InMessagingComponent,
    PostListComponent,
    PostItemComponent,
    FriendsItemComponent,
    InMessagingListComponent,
    ProfilePageComponent,
    MyProfilePageComponent,
    NetworkPageComponent,
    MyProfileCardComponent,
    RelatedUserComponent,
    SendPostPanelComponent,
    ReceivePostPanelComponent,
    ChatComponent,
    ChatBoxComponent,
    FriendChatListComponent,
    LoginPageComponent,
    SignupPageComponent,
    ForgotPasswordComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgbModule,
    SocketIoModule.forRoot(config),
    TranslateModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { 
      enabled: environment.production, 
      registrationStrategy: 'registerImmediately'
    }),
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    MatExpansionModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatListModule,
    MatToolbarModule,
    MatDividerModule,
    MatInputModule,
    ScrollingModule,
    
    MatDatepickerModule,
    NgxMatDrmCountriesFlagsModule,
    MatDialogModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    
  ],
  providers: [ManageSessionService, AuthGuard, MatDatepickerModule, ListEventEmitterService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
