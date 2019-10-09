import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BusinessService } from '../services/business.service';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  shownGroup = null;
  public rate:number = 0;
  public reviewData:any = {};
  public userDetails:any = {};
  public rating:any;
  public businessreviewData:any = {};
  public reviewsList:any = [];
  public personalinformationsData:any ={};
  public personalreviewinformation:any;
  public personalreviewinformationreviews:any =[];
  public appintmentDitails:any;
  public currentlocation:any;
  public comment:any;

  constructor(public navCtrl:NavController,
              private translate: TranslateService,
              public businessService:BusinessService,
              public userService:UserService) { 

    this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    this.currentlocation = JSON.parse(localStorage.getItem("latLong"));
    console.log(this.userDetails);   
  }

  ngOnInit() {
    console.log(this.userDetails);
    this.getpersonalReview();
  }

  // toggle group
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };

  isGroupShown(group) {
      return this.shownGroup === group;
  };

  // rate change event
  onRateChange(event, reviewData) {
    console.log(reviewData);
    this.appintmentDitails = reviewData;
    console.log('Your rate:', event);
    this.rating = event;
    
  }

  // write review
  writeReview() {
    if(!this.rating){
       alert('Please select any rating');
    } else {
       this.reviewData = {
        "business_id":this.appintmentDitails.business_id, "appointment_id":this.appintmentDitails.id, "user_id":this.userDetails.id, 
        "role_id":this.userDetails.role_id, "token":this.userDetails.token.original.token, 
        "review_rating":this.rating, "comment":this.comment
       }
       console.log(this.reviewData);
       this.businessService.addReview( this.reviewData ).subscribe((res : any)=> {
        console.log(res);
        this.comment = '';
        this.reviewData = {};
        console.log(this.reviewData)
      }); 
    }
    
  }

  // add comment
  addComment() {
    this.reviewData.comment = this.comment;
  }

  // get personal review
  getpersonalReview(){
    if(this.userDetails){
      this.personalinformationsData = { 
       "user_id": this.userDetails.id,
        "role_id": this.userDetails.role_id,
      "token":this.userDetails.token.original.token
     };
     console.log('pesonal',this.personalinformationsData);
    }
    this.userService.personalReview(this.personalinformationsData).subscribe((res:any)=>{
      console.log(res);
      if(res.status == 'success'){
        this.personalreviewinformation = res.data.user;
        for(let i = 0; i < this.personalreviewinformation.length; i++){
          if (this.currentlocation) {
            this.personalreviewinformation[i].distance = this.businessService.getDistanceFromLatLonInKm(this.currentlocation.lat, this.currentlocation.long, this.personalreviewinformation[i].latitude, this.personalreviewinformation[i].longitude);
          }
        }
      }

    });
    }
  }

 

