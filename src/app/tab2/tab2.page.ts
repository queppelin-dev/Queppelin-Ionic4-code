import { Component,Input } from '@angular/core';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { NgZone, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { TranslateService } from '@ngx-translate/core';
import { BusinessService } from '../services/business.service';
import { ServiceList } from '../models/servicelist';
import { Business } from '../models/business';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
   salon: string = "All";
   public language: string;
   public HairSalon:any;
   data : any;
   public serviceList:ServiceList;
   public categoryData: any = {};
   @Input()ngSwitchCase: any
   public themes:string = 'black';
   public businessList:Business;
   public businessData: any = [];
   public conditionalBusinessList: any = [];
   public sortConditionalBusinessList: any = [];
   public positions:boolean = false;
   public conditionbusinesslisteducation:any = {};
   public conditionbusinesslissalon:any = {};
   public currentlocation:any;
   public conditionalBusinessData: any= {};
   public categoryId:any;

  constructor( private datePicker: DatePicker,
               public navCtrl:NavController,
               private translate: TranslateService,
               public businessservice:BusinessService,
               private geolocation: Geolocation ,
               private router: Router) {
          this.language = localStorage.getItem("language");
          this.themes = localStorage.getItem("themes");
          this.conditionbusinesslisteducation = JSON.parse(localStorage.getItem("conditionbusinesslisteducation"));          
          this.conditionbusinesslissalon = JSON.parse(localStorage.getItem("conditionbusinesslisteducation"));
          this.categoryData = JSON.parse(localStorage.getItem("categoryData"));

          if( this.language == 'ar') {
            document.documentElement.dir = 'rtl';
           this.positions = true;
        } 
       
        this.currentlocation = JSON.parse(localStorage.getItem("latLong"));
        this.categoryId = localStorage.getItem("categoryID");
          this.getCurrentlocation();
          this.getServicelist();
          this.getBusinessList()

  }
  ionViewDidEnter() {
    this.categoryId = localStorage.getItem("categoryID");
    this.getConditionalBusinessList();
  }

  // datepicker
  datepicker(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  //navigate to details page
  goToDetailsPage(item:any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        businessDetails: JSON.stringify(item)
      }
    };
    this.router.navigate(['details-page'], navigationExtras);
  }

 // get service list 
getServicelist(){
  this.categoryData.categoryid = 1;
   this.businessservice.category(this.categoryData).subscribe((res : ServiceList)=>{
     console.log(res);
     if(res.status == 'success'){
       this.serviceList = res.data.user;
     }
   }
   );
  }

  //get business list
  getBusinessList() {
    this.businessservice.businessList().subscribe((res : Business)=>{
      console.log(res);
      if(res.status == "success"){
         this.businessList = res.data.user;
         for( let i = 0; i < this.businessList.length; i++ ){
            if(this.businessList[i].name != null) {
              if(this.currentlocation) {
                 this.businessList[i].distance = this.businessservice.getDistanceFromLatLonInKm(this.currentlocation.lat, this.currentlocation.long, this.businessList[i].latitude, this.businessList[i].longitude);
              }
              this.businessData.push(this.businessList[i]);
              var maxRating = 5;
                var apiRating = this.businessList[i].review_count;
              this.businessList[i].ratingPercent = Math.floor((apiRating / maxRating) * 100)+'%';
                //alert( this.businessList[i].ratingPercent);
            }
         }
      }
    }); 
  }

  //get conditional business list
  getConditionalBusinessList() {
    this.conditionalBusinessData = {"categoryid":this.categoryId, "Latitude": this.currentlocation.lat, "Longitude": this.currentlocation.long}
    this.businessservice.conditionalBusinessList(this.conditionalBusinessData).subscribe((res : any)=>{
      console.log(res);
      if(res.status == "success"){
         this.conditionalBusinessList = res.data.user;
         for( let i = 0; i < this.conditionalBusinessList.length; i++ ){
            if(this.conditionalBusinessList[i].name != null) {
              this.sortConditionalBusinessList.push(this.conditionalBusinessList[i]);
              var maxRating = 5;
                var apiRating = this.conditionalBusinessList[i].review_count;
              this.conditionalBusinessList[i].ratingPercent = Math.floor((apiRating / maxRating) * 100)+'%';
                //alert( this.businessList[i].ratingPercent);
            }
         }
      }
    }); 
  }
 
  // get current location
  getCurrentlocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentlocation = {"lat":resp.coords.latitude, "long":resp.coords.longitude};
      localStorage.setItem("latLong", JSON.stringify({"lat":resp.coords.latitude, "long":resp.coords.longitude}));
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
