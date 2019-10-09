import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, Marker, GoogleMapsAnimation, MyLocation } from '@ionic-native/google-maps/ngx';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BusinessService } from '../services/business.service';
import { ServiceList } from '../models/servicelist';
import { Observable } from 'rxjs';
import { BusinessReview } from '../models/businessreview';
import { BusinessInfo }  from '../models/businessinfo'
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AddressPage } from '../address/address.page';
declare var google;

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.page.html',
  styleUrls: ['./details-page.page.scss'],
})
export class DetailsPagePage implements OnInit {
  segmentText: string = "Services";
  showSlider: boolean = true;
  map;
  @ViewChild('mapElements', { read: true, static: false }) mapElements;
  public mapData:any;
  businessinfo:BusinessInfo;
  public businessinfoData:any = { };
  public serviceData:any = { };
  public serviceList:ServiceList;
  public businessreviewData:any = { };
  public businessreview:any;
  public businessReviewCount:any = [];
  public ratingPercent:any;
  public addService:any = [];
  public businessDetails:any = {};
  public reviewcountData:any = {};
  public business_id:any;
  public reviewcountfound:boolean= true;
  public reviewcountnotfound:boolean = false;
  public busineesDistance:any;
  public businessLatLong:any ={};
  public lat:number;
  public long:number;

  constructor( private platform: Platform,
               public navCtrl:NavController,
               private translate: TranslateService,
               public businessService:BusinessService,
               private route: ActivatedRoute,
               private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.businessDetails) {
        this.businessDetails = JSON.parse(params.businessDetails);
        console.log('businessDetails',this.businessDetails);
      
      }
    });
    this.businessLatLong = JSON.parse(localStorage.getItem("latLong"));
  }

  async ngOnInit() {
    this.getBusinessInfo();
    this.getServiceList();
    this.getBusinessReview();
    this.getBusinessReviewCount();
  }

  ngDoCheck() {
   if( this.segmentText == 'Services') {
     this.showSlider = true;
   } else {
    this.showSlider = false;
   }
  }
  
  ngAfterContentInit() {
  }

  // navigation on book appointment page
  goToBookAppointmentPage(item:any) {
    console.log('data',item)
    if(this.addService.includes(item)) {
      console.log('already added') 
    } else {
      this.addService.push(item);
    }  
    let navigationExtras: NavigationExtras = {
      queryParams: {
        serviceDetails: JSON.stringify(this.addService)
      }
    };
    this.router.navigate(['bookappointment'], navigationExtras);
  }

  //get service list
  getServiceList() {
    this.serviceData ={
      "business_id":this.businessDetails.business_id
    };
    this.businessService.serviceList( this.serviceData ).subscribe((res : ServiceList)=> {
      console.log(res);
      if(res.status == "success"){
         this.serviceList = res.data.user;
         console.log(this.serviceList);
      }
    }); 
  }

  //get business review list
  getBusinessReview() {
    this.businessreviewData = {
     "business_id":this.businessDetails.business_id
    };
    this.businessService.businessReview( this.businessreviewData).subscribe((res : any)=> {
      console.log(res);
      if(res.status == "success"){
         this.businessreview = res.data.user;
         console.log(this.businessreview);
         for( let i = 0; i < this.businessreview.length; i++ ){
            var maxRating = 5;
            var apiRating = this.businessreview[i].review_rating;
          this.businessreview[i].ratingPercent = Math.floor((apiRating / maxRating) * 100)+'%';
          }
      }
      if(res.status == "fail"){
        alert("No Record available")
      }
    }); 
  }

  // get business info
  getBusinessInfo(){
    this.businessinfoData ={
      "business_id":this.businessDetails.business_id
    };
    console.log('bid', this.businessinfoData);
    this.businessService.businessInfo(this.businessinfoData).subscribe((res:BusinessInfo)=> {
    console.log(res);
    if(res.status == "success"){
      this.businessinfo = res.data.user;
      this.lat = this.businessinfo.latitude;
      this.long = this.businessinfo.longitude;
      var lat =+this.lat;
      var long =+this.long;
      // init map......
      this.map = new google.maps.Map(
        this.mapElements.nativeElement,
        {
          center: {lat: lat, lng: long},
          zoom: 16
        });

      this.busineesDistance = this.businessService.getDistanceFromLatLonInKm(this.businessLatLong.lat, this.businessLatLong.long, lat, long);
      this.busineesDistance = this.busineesDistance.toFixed(0);
      alert(this.busineesDistance)
      console.log( this.businessinfo);
      var maxRating = 5;
      var apiRating = this.businessinfo.review_count;
      this.ratingPercent = Math.floor((apiRating / maxRating) * 100)+'%';
      }
    });
  }

  // get business review count
  getBusinessReviewCount() {
    this.business_id = this.businessDetails.business_id    
    console.log('reviewdata', this.reviewcountData)
    this.businessService.reviewCount( this.business_id).subscribe((res : any)=> {
      console.log('res',res);

      if(res.status == "success"){
    
         this.businessReviewCount = res.data.user;
         console.log(this.businessReviewCount);
         for( let i = 0; i < this.businessReviewCount.length; i++ ){
            var maxProgress = 10;
            var apiprogress = this.businessReviewCount[i].review_count;
            this.businessReviewCount[i].progressrating = (apiprogress/maxProgress);
          }        
      }   
    }); 
  }
  
}