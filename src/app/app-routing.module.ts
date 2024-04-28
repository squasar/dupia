import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TimelinePageComponent } from './pages/timeline-page/timeline-page.component';
//import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthGuard } from './login/auth.guart';
import { MyProfilePageComponent } from './pages/my-profile-page/my-profile-page.component';
import { NetworkPageComponent } from './pages/network-page/network-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MainPageComponent } from './oldDupia/pages/main-page/main-page.component';
import { LoginPageComponent } from './oldDupia/pages/login-page/login-page.component';
import { SignupPageComponent } from './oldDupia/pages/signup-page/signup-page.component';
import { ForgotPasswordComponent } from './oldDupia/pages/forgot-password/forgot-password.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },

  /*{ path: 'timeline', component: TimelinePageComponent, canActivate : [AuthGuard] },
  { path: 'my_profile', component: MyProfilePageComponent, canActivate : [AuthGuard] },
  { path: 'my_network', component: NetworkPageComponent, canActivate : [AuthGuard] },
  { path: 'profiles/:profile_id', component: ProfilePageComponent, canActivate : [AuthGuard] },
  //{ path: 'ref_link', redirectTo:'' ,component: MainPageComponent},
  { path: 'ref_link/:ref_id_for_link',component: MainPageComponent},
  //{ path: 'rootCom',  component: AppComponent }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
