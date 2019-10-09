import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { throwError } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {AuthCredential} from '@firebase/auth-types';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
public Signin:boolean = true;
public Phoneno:boolean = false;
public Confirmation:boolean = false;
public email:boolean = false;
public signup:boolean = false;
public enterPhoneno:boolean = false;
public signupformobile:boolean = false;
users:any;
public randomNumber:any;
public bgImg:any;
public totalCount = 3;
public userData:any = {};
public loginData:any = {};
public otpdata:any = {};
public mobileregData:any = {};
public otps:any = {};
public OTP_token:any
public loginmobileData:any = {};
  otpusers:any;
  loginmobile:any;
  public mobileDetails:any = {};
user: Observable<firebase.User>;
public firstTimeLogin:any = "yes";

  constructor( public navCtrl:NavController,
               private translate: TranslateService,
               public userService: UserService,
               private router:Router,
               public fb: Facebook,
               private googlePlus: GooglePlus,
               private storage: Storage,
               private afAuth: AngularFireAuth,
               private platform: Platform  ) {

    this.randombg();
    this.mobileDetails = JSON.parse(localStorage.getItem("mobileDetails"));
    this.user = this.afAuth.authState;

  }

  ngOnInit() {
    
  }

  // open phone section
  goToPhonenoPage(){
    this.Signin = false;
  this.enterPhoneno = true;
  }

  // open email section
  goToEmailPage(){
    this.Signin = false;
    this.email = true;
  }

  // login with google
  async doGoogleLogin(){
    
    this.googlePlus.login({
      'scopes': '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': environment.googleWebClientId, // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then(user => {
        //save user data on the native storage
        alert(JSON.stringify(user))
       
      }, err => {
        console.log(err);
        alert(err)
      })
  }

  // navigation to confirmation page
  goToConfirmationPage(){
    this.userService.sendOtp(this.otpdata).subscribe((res:any)=>{
      console.log(res);
    if(res.status == "success"){
      this.otpusers = res.data.user;
      console.log(this.otpusers);
      localStorage.setItem("mobileDetails", JSON.stringify(res.data.user));
    this.Signin = false;
    this.Phoneno = false;
    this.email= false;
    this.enterPhoneno = false;
    this.Confirmation = true;
    }
  });
  }

  // resend otp
  resendcode(){
    this.userService.sendOtp(this.otpdata).subscribe((res:any)=>{
      console.log(res);
    if(res.status == "success"){
      this.otpusers = res.data.user;
      console.log(this.users);
      localStorage.setItem("mobileDetails", JSON.stringify(res.data.user));
    this.Signin = false;
    this.Phoneno = false;
    this.email= false;
    this.enterPhoneno = false;
    this.Confirmation = true;
    }
  });
  }

  // navigation to tab1 page
  goToSchedulixPage(){
    this.userService.login(this.loginData).subscribe((res : any)=> {
      console.log(res);
      if(res.status == "success"){
        this.navCtrl.navigateForward('/tabs/tab1');
        this.users = res.data.user;
        console.log(this.users);
        localStorage.setItem("userDetails", JSON.stringify(this.users));
        localStorage.setItem("firststTimeLogin", this.firstTimeLogin);
        this.Signin = false;
        this.Phoneno = false;
        this.email= false;
        this.Confirmation = false;

      }
    },
    error => console.log('send data')
    );
  }

  // navigation to signup section
  goToSignupPage(){
    this.Signin = false;
    this.Phoneno = false;
    this.email= false;
    this.Confirmation = false;
    this.signup = true;
  }
 
  // navigation to dashboard page
  goToDashboardPage(){
    this.Signin = false;
    this.Phoneno = false;
    this.email= false;
    this.Confirmation = false;
    this.navCtrl.navigateForward('/tabs/tab1');
  }

  // select random image
  randombg(){
    var images=['/shutterstock1.png',
    '/shutterstock2.png','/shutterstock3.png'];
    this.randomNumber = Math.floor(Math.random() * images.length);
    let bgimage = images[this.randomNumber];
     this.bgImg = 'url("../assets/images'+bgimage+'")';
  }

  // navigation to tabs page
  goToMainPage(){
     this.userService.register(this.userData).subscribe((res : any)=> {
      console.log(res);
      if(res.status == "success"){
       this.users = res.data.user;
       console.log(this.users);
       this.Phoneno = false;
       this.email= false;
       this.Confirmation = false;
       this.signup = false;
       this.Signin = false;
       this.email = false;
       this.navCtrl.navigateForward('/tabs/tab1');
      }
    });
  }

  // registration check
  registrationCheck(){
    this.OTP_token = this.otps.otp1 + this.otps.otp2 + this.otps.otp3 + this.otps.otp4 + this.otps.otp5 + this.otps.otp6;
    if(this.mobileDetails && this.OTP_token){
    this.loginmobileData = {
      "mobile":this.mobileDetails.mobileNum,
      "OTP_token": this.OTP_token
     }}
    this.userService.loginCheckMobile(this.loginmobileData).subscribe((res:any)=> {
    console.log(res);
      if(res.status == "success"){
        this.loginmobileData  = {};
        this.loginmobile = res.data.user;
        localStorage.setItem("userDetails", JSON.stringify(this.loginmobile));
        localStorage.setItem("firststTimeLogin", this.firstTimeLogin);
        this.navCtrl.navigateForward('/tabs/tab1');
      }
    },err => {
      console.log(err);
      this.Phoneno = false;
      this.email= false;
      this.Confirmation = false;
      this.signup = false;
      this.Signin = false;
      this.email = false;
      this.enterPhoneno = false;
      this.signupformobile = true;
   });
  }

  // open dashboard section
  goToDashboardPages(){
    this.mobileregData = {
      "mobile":this.mobileDetails.mobileNum,
      "OTP_token":this.OTP_token,
      "first_name":this.mobileregData.first_name,
      "last_name": this.mobileregData.last_name
    }
    this.userService.register(this.mobileregData).subscribe((res : any)=> {
      console.log(res);
        if(res.status == "success"){
            this.mobileregData = {};
            this.users = res.data.user;
            this.Phoneno = false;
            this.email= false;
            this.Confirmation = false;
            this.signup = false;
            this.Signin = false;
            this.email = false;
            this.enterPhoneno = false;
            this.signupformobile = false;
            this.navCtrl.navigateForward('/tabs/tab1');
        }
    });
  }

  //open phone section
  gotophonepage(){
    this.Confirmation = false;
    this.enterPhoneno = true;
  }

  moveToNext(nextElement) {
    nextElement.setFocus();
  }

  // login with fb
  loginWithFb() {
     this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
     .then( (res: FacebookLoginResponse) => {
         if(res.status == "connected") {
             var fb_id = res.authResponse.userID;
             var fb_token = res.authResponse.accessToken;
             this.fb.api("/me?fields=name,gender,birthday,email,picture.width(720).height(720).as(picture_large)", []).then((user) => {
              var fbData = {"name":user.name, "email":user.email, "facebook_auth_token":"10555629077399852", "image":user.picture_large.data.url};
              this.userService.loginWithFB(fbData).subscribe((res : any)=> {
              console.log(res);
              this.navCtrl.navigateForward('/tabs/tab1');
              }, err => {
                alert(JSON.stringify(err));  
              });
             });
         } 
         else {
             console.log("An error occurred...");
         }
     })
     .catch((e) => {
         console.log('Error logging into Facebook', e);
     });
  }

  //login with google
  loginWithGoogle() {

      this.googlePlus.login({
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '614341758035-hg8fpunerbpj874tb8s1vrg7mm8168pg.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        //'webClientId':'614341758035-raau8ssbcr2iqroso7d1cp81mq1rd8tu.apps.googleusercontent.com',
        'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then(user =>{
        alert(JSON.stringify(user))
      }, err =>{
        console.log(err)
        alert(JSON.stringify(err))
      });
  
  }

  // google web login
  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      alert(JSON.stringify(credential))
  
    } catch(err) {
      console.log(err)
    }
  
  }

}