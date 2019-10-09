import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.page.html',
  styleUrls: ['./account-details.page.scss'],
})
export class AccountDetailsPage implements OnInit {

  public userServiceData:any = {};
  public accountServiceData:any = {};
  public acountDetails:any = {};
  public userDetails:any = {};
  public accountDetails:any = {};
  public accountDetailboth:any = {};
  public accountDetailman:any = {};
  public accountDetailwoman:any = {};
  public personalDetails:any = {};


  constructor( private translate: TranslateService,
               public userService:UserService,
               public navCtrl:NavController ) { 
     this.userDetails = JSON.parse(localStorage.getItem("userDetails"));   
  }

  ngOnInit() {
    this.getAccountDetails();
  }

  // get account details
  getAccountDetails() {
    if(this.userDetails){
    this.userServiceData = {  "user_id":this.userDetails.id,"role_id":this.userDetails.role_id,"token":this.userDetails.token.original.token };
    }
    this.userService.accountDetails(this.userServiceData).subscribe((res : any)=> {
     if(res.status == "success") {
      this.acountDetails = res.data.user[0];
      console.log(this.acountDetails);
      if( this.acountDetails.services_type == 'Both'){
        this.accountDetailboth =  this.acountDetails.services_type;
        console.log('both', this.accountDetailboth)
      }
      else if(this.acountDetails.services_type == 'Man'){
        this.accountDetailman =  this.acountDetails.services_type;
        console.log('man', this.accountDetailman)
      }
      else if(this.acountDetails.services_type == 'Woman'){
        this.accountDetailwoman =  this.acountDetails.services_type;
        console.log('Woman', this.accountDetailwoman)
      }
      this.userServiceData = {};
     } 
     if(res.data.user == null){
      alert('Token has been expired,first you have to login');
      this.navCtrl.navigateForward('/signin');
    } 
     
    });
  }

  // save data
  savebtn(){
    if(this.userDetails && this.acountDetails){
    this.accountServiceData = {  "user_id":this.userDetails.id,"role_id":this.userDetails.role_id,"token":this.userDetails.token.original.token,
     "name": this.acountDetails.name,"email":this.acountDetails.email,"mobile":this.acountDetails.mobile,
      "dob": this.acountDetails.dob,"services_type":this.acountDetails.services_type};
    
    this.userService.personalDetails(this.accountServiceData).subscribe((res : any)=> {
      if(res.status == "success"){
       this.personalDetails = res.data.user;
       console.log( res.data.user);
       this.accountServiceData = {};
       this.navCtrl.navigateForward('/tabs/tab4');
      }
     }); 
    }
}
}


