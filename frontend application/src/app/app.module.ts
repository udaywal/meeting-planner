import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { MainService } from './main.service';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { LandingModule } from './landing/landing.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { MeetingModule } from './meeting/meeting.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './landing/login/login.component';
import { SignupComponent } from './landing/signup/signup.component';
import { UserdashComponent } from './user/userdash/userdash.component';
import { AdmindashComponent } from './admin/admindash/admindash.component';
import { CreateMeetComponent } from './meeting/create-meet/create-meet.component';
import { UpdateMeetComponent } from './meeting/update-meet/update-meet.component';
import { ForgotPasswordComponent } from './landing/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './landing/reset-password/reset-password.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LandingComponent } from './landing/landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerErrorComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    UserModule,
    AdminModule,
    LandingModule,
    MeetingModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: LandingComponent },
      { path: 'signup', component: SignupComponent},
      { path: 'login', component: LoginComponent},
      { path: 'user/userdash', component: UserdashComponent},
      { path: 'admin/admindash', component: AdmindashComponent},
      { path: 'meeting/create', component: CreateMeetComponent},
      { path: 'meeting/update/:meetingId', component: UpdateMeetComponent},
      { path: 'forgotpassword', component: ForgotPasswordComponent},
      { path: 'resetpassword/:userId', component: ResetPasswordComponent},
      { path: 'server-error', component: ServerErrorComponent},
      { path: 'page-not-found', component: PageNotFoundComponent},
      { path: '*', redirectTo: 'page-not-found'},
      { path: '**', redirectTo: 'page-not-found'}
    ])
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})

export class AppModule { }