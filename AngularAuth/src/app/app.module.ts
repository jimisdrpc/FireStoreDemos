import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

import { AppRoutingModule } from './app-routing.module';
import { EmailComponent } from './email/email.component';

const firebaseConfig = {
  apiKey: 'AIzaSyBq8MoW-TsbIqPs1nbyuANQIUIDBMSUDys',
  authDomain: 'angularauth-3d931.firebaseapp.com',
  databaseURL: 'https://angularauth-3d931.firebaseio.com',
  projectId: 'angularauth-3d931',
  storageBucket: 'angularauth-3d931.appspot.com',
  messagingSenderId: '702894565960',
  appId: '1:702894565960:web:2d66ac20f5ad9107ee067d'
};

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }