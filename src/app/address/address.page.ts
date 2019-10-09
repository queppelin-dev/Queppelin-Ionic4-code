import { Component,AfterContentInit, OnInit,ViewChild } from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, Marker, GoogleMapsAnimation, MyLocation } from '@ionic-native/google-maps/ngx';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
import { BusinessService } from '../services/business.service';
declare var google;
@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit, AfterContentInit {
  public personalinformations:any = {};
  public userDetails:any ={};
  public personalData:any = {};
  map;
  @ViewChild('mapElement',{ read: true, static: false }) mapElement;
 public personalinformation:any;
 public addressData:any = {};
 public countryData:any = {};
 public countryList:any = [];
 public stateList:any = [];
 public cityList:any=[];
 public counteryShortData:any =[];
 public stateId:any;
 public cityId:any;
 public addressDetails:any = {};
 public currentlocation:any = {};
  
  constructor( private platform: Platform,
               private translate: TranslateService,
               public userService: UserService,
               public businessService:BusinessService ) {

     this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
     console.log(this.userDetails)
     this.currentlocation = JSON.parse(localStorage.getItem("latLong"));
     console.log( this.userDetails);
  }


  ngOnInit(): void {
    this.getCountryList();
  }

  ngAfterContentInit(): void {
  }

  // get personal information
  getPersonalInformation() {
    if(this.userDetails){
      this.personalinformations = {
      "user_id": this.userDetails.id,
        "role_id": this.userDetails.role_id,
      "token":this.userDetails.token.original.token
      };
    console.log(this.personalinformations);
    }
    this.userService.personalInformation(this.personalinformations).subscribe((res:any)=>{
      console.log(res);
      if(res.status == 'success'){
        this.personalinformations = res.data.user;
        this.addressDetails = this.personalinformations.get_user_address;
        if(this.addressDetails) {
            this.map = new google.maps.Map(
              this.mapElement.nativeElement,
              {
                center: {lat:Number(this.addressDetails.latitude), lng:Number(this.addressDetails.longitude)},
                zoom: 17
              });
        }
      }
    });
  }

  // get country list
  getCountryList() {
    this.businessService.counteryList(this.addressData).subscribe((res:any)=>{
      console.log(res);
      this.countryList = res.data.user;    
    });
  }

  //update address
  updateAddress() {
    let addressData = {"user_id": this.userDetails.id, "role_id":this.userDetails.role_id, "address":this.addressDetails.address, "city_id":this.addressDetails.city_id,
                       "state_id":this.addressDetails.state_id, "country_id":this.addressDetails.country_id, "zip_code":this.addressDetails.zip_code, "country_postal_code":this.addressDetails.zip_code,
                       "latitude":this.currentlocation.lat, "longitude":this.currentlocation.long, "token":this.userDetails.token.original.token};
    this.userService.updateAddress(addressData).subscribe((res:any)=>{
      console.log(res);
      alert("Address updated successfully")
    });
  }
  
  // get unique state
   getUniqueSatet(arr){
    let set = new Set();
    return arr.map((v, index) => { 
      
       if(set.has(v.state_id)) {
           return false
       } else {
           set.add(v.state_id);
           return index;
       } 
      }).filter(e=>e).map(e=>arr[e]);
    
    }

    //get unique city
    getUniqueCity(arr){
      let set = new Set();
      return arr.map((v, index) => { 
        
         if(set.has(v.city_id)) {
             return false
         } else {
             set.add(v.city_id);
             return index;
         } 
        }).filter(e=>e).map(e=>arr[e]);
      
      }

    //get state data
    getStateData() {
      this.addressData = {"country_id":this.addressDetails.country_id}
      this.businessService.counteryList(this.addressData).subscribe((res:any)=>{
        console.log(res);
        let  CounteryData = res.data.user;

        this.stateList = this.getUniqueSatet(CounteryData);
        console.log(this.stateList)
      });
    }

    // get city data
    getCityData() {
      this.addressData = {"country_id":this.addressDetails.country_id, "state_id":this.addressDetails.state_id};
      this.businessService.counteryList(this.addressData).subscribe((res:any)=>{
        console.log(res);
        let  CounteryData = res.data.user;
        
        this.cityList = this.getUniqueCity(CounteryData);
        console.log(this.counteryShortData)
       
      });
    }
}

