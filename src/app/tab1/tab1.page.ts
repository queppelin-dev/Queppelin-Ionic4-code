import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { PopoverController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BusinessService } from '../services/business.service';
import { Business } from '../models/business';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public favwithlist: boolean = false;
  public favwithoutlist: boolean = true;
  public language: string;
  public themes: string = 'black';
  public businessList: Business;
  public categorys: any;
  public businessData: any = [];
  public customData: any = [];
  public customDatas: any = [];
  public categorylistData: any = [];
  public categorylistDatas: any = [];
  public businessDatas: any = [];
  public position: boolean = false;
  public rating: any;
  public apiRating: any;
  public categoryData: any = {};
  public businessCategoryServiceData = {};
  public conditionbusinesslist: any;
  public businessDetails: any = {};
  public categorybusinessDetails: any = {};
  public userDetails: any = {};
  public businessfavData: any = {};
  public businessfavwithoutlist: any;
  public businessfavwithlist: any;
  public categorylist: any = {};
  public currentlocation: any;
  public categories: any = [];
  public image1: any;
  public afterlogin:boolean = false;
  public appointmentlist:any ={};
  public aferappointment:boolean = false;
  public firstTimeLogin:any;

  constructor(public platform: Platform,
    private translate: TranslateService,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    public businessService: BusinessService,
    public navCtrl: NavController,
    public router: Router,
    private storage: Storage) {

    this.language = localStorage.getItem("language");
    this.themes = localStorage.getItem("themes");

    this.currentlocation = JSON.parse(localStorage.getItem("latLong"));
    if (this.language == 'ar') {
      document.documentElement.dir = 'rtl';
      this.position = true;
    }
    this.getCategoryService();
    this.getcategorylist();
    this.getfavlistwithoutcustomer();

  }
  ionViewDidLoad() {
 
  }
  ngOnInit() {
    this.appointmentlist = JSON.parse(localStorage.getItem("appointmentlist"));
    if(this.appointmentlist){
      this.aferappointment = true;
      this.afterlogin = false;
      }
  }
 
  ionViewDidEnter() {
    this.appointmentlist = JSON.parse(localStorage.getItem("appointmentlist"));
    this.firstTimeLogin = localStorage.getItem("firststTimeLogin");
    if(this.appointmentlist){
      this.afterlogin = false;
      this.aferappointment = true;
      }
    this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
   
    console.log('appointlist',this.appointmentlist)
    if (this.userDetails) {
      this.getfavlistwithcustomer();
      this.afterlogin = true;
    } else {
      this.businessfavwithlist = [];
    }
   
  } 

  ionViewDidLeave() {
    this.firstTimeLogin = "no";
    localStorage.setItem("firststTimeLogin", "no");
  }
 
  // get favorite list without of customer

  getfavlistwithoutcustomer() {

    this.businessService.favlistwithoutcustomer().subscribe((res: any) => {
      console.log(res);
      if (res.status == "success") {
        this.favwithoutlist = true;
        this.favwithlist = false;
        this.businessfavwithoutlist = res.data.user;
        console.log('favlist', this.businessfavwithoutlist);
        for (let i = 0; i < this.businessfavwithoutlist.length; i++) {
          localStorage.setItem("businessData", JSON.stringify(this.businessfavwithoutlist));
          var maxRating = 5;
          var apiRating = this.businessfavwithoutlist[i].review_count;
          this.businessfavwithoutlist[i].ratingPercent = Math.floor((apiRating / maxRating) * 100) + '%';

          if (this.currentlocation) {
            this.businessfavwithoutlist[i].distance = this.businessService.getDistanceFromLatLonInKm(this.currentlocation.lat, this.currentlocation.long, this.businessfavwithoutlist[i].latitude, this.businessfavwithoutlist[i].longitude);
          }
        }
      }
    });
  }

  // get favorite list of customer

  getfavlistwithcustomer() {
    this.businessfavData = {
      "user_id": this.userDetails.id,
      "role_id": this.userDetails.role_id,
      "token": this.userDetails.token.original.token
    }
    this.businessService.favlistwithcustomer(this.businessfavData).subscribe((res: any) => {
      console.log(res);
      if (res.status == "success") {
        this.favwithlist = true;
        this.favwithoutlist = false;
        this.businessfavwithlist = res.data.user;
        console.log('favlists', this.businessfavwithlist);
        for (let i = 0; i < this.businessfavwithlist.length; i++) {
          if (this.currentlocation) {
            this.businessfavwithlist[i].distance = this.businessService.getDistanceFromLatLonInKm(this.currentlocation.lat, this.currentlocation.long, this.businessfavwithlist[i].latitude, this.businessfavwithlist[i].longitude);
          }
          localStorage.setItem("businessData", JSON.stringify(this.businessfavwithlist));
          var maxRating = 5;
          var apiRating = this.businessfavwithlist[i].review_count;
          this.businessfavwithlist[i].ratingPercent = Math.floor((apiRating / maxRating) * 100) + '%';
          // alert( this.businessList[i].ratingPercent)

        }
      }
    });
  }

  // get favorite category list
  getcategorylist() {

    this.businessService.categorylist().subscribe((res: any) => {
      console.log('catglist', res);
      if (res.status == "success") {
        this.categorylist = res.data.user;
        localStorage.setItem("categoryData", JSON.stringify(this.categorylist));
        var categorylistlength = this.categorylist.length / 2;
        console.log('length', categorylistlength);
        for (let i = 0; i < categorylistlength; i++) {

           if (this.categorylist[i].image != null) {
              this.customData.push(this.categorylist[i]);
           }
        }

        for (let i = categorylistlength; i < this.categorylist.length; i++) {
          if (this.categorylist[i].image != null) {
            this.categorylistDatas.push(this.categorylist[i]);
            console.log('catdata2', this.categorylistData)
          }

        }
      }

    });
  }
  
  // navigation to explore page
   gotoexplorepage(items:any) {
     console.log('items',items);
     localStorage.setItem("categoryID",items.id) 
     this.navCtrl.navigateForward('/tabs/tab2');
   }
 
  // get category service
  getCategoryService() {
    this.categoryData.categoryid;
    this.businessService.category(this.categoryData).subscribe((res: any) => {
      console.log(res);
      if (res.status == 'success') {
        this.categorys = res.data.user;
        console.log(this.categorys);
      }
    });
  }

  onRateChange(event) {
    console.log('Your rate:', event);
    this.rating = event;
  }

  // navigation to details page
  goToDetailsPage(item: any) {
    console.log('item', item);

    let navigationExtras: NavigationExtras = {
      queryParams: {
        businessDetails: JSON.stringify(item)

      }
    };
    this.router.navigate(['details-page'], navigationExtras);
    console.log('business', this.businessDetails)
  }
  
  //get education data
  Education() {
    this.businessCategoryServiceData = { "categoryid": this.categorys.main_category_id = 7 };
    this.businessService.conditionBusinessList(this.businessCategoryServiceData).subscribe((res: any) => {
      console.log(res);
      if (res.status == 'success') {
        this.conditionbusinesslist = res.data.user;
        localStorage.setItem("conditionbusinesslisteducation", JSON.stringify(res.data.user));
        this.navCtrl.navigateForward('/tabs/tab2');
      }
    });
  }
  
  // get salon data
  Salon() {
    this.businessCategoryServiceData = { "categoryid": this.categorys.main_category_id = 4 };
    this.businessService.conditionBusinessList(this.businessCategoryServiceData).subscribe((res: any) => {
      console.log(res);
      if (res.status == 'success') {
        this.conditionbusinesslist = res.data.user;
        localStorage.setItem("conditionbusinesslistsalon", JSON.stringify(res.data.user));
        this.navCtrl.navigateForward('/tabs/tab2');
      }
    });
  }
  
  // get medicine data
  Medicine() {
    this.businessCategoryServiceData = { "categoryid": this.categorys.main_category_id = 3 };
    this.businessService.conditionBusinessList(this.businessCategoryServiceData).subscribe((res: any) => {
      console.log(res);
      if (res.status == 'success') {
        this.conditionbusinesslist = res.data.user;
        this.navCtrl.navigateForward('/tabs/tab2');
      }
    });
  }
  
  //get fitness data
  Fitness() {
    this.businessCategoryServiceData = { "categoryid": this.categorys.main_category_id = 5 };
    this.businessService.conditionBusinessList(this.businessCategoryServiceData).subscribe((res: any) => {
      console.log(res);
      if (res.status == 'success') {
        this.conditionbusinesslist = res.data.user;
        this.navCtrl.navigateForward('/tabs/tab2');
      }
    });
  }
  
  //get health data
  Health() {
    this.businessCategoryServiceData = { "categoryid": this.categorys.main_category_id = 12 };
    this.businessService.conditionBusinessList(this.businessCategoryServiceData).subscribe((res: any) => {
      console.log(res);
      if (res.status == 'success') {
        this.conditionbusinesslist = res.data.user;
        this.navCtrl.navigateForward('/tabs/tab2');
      }
    });
  }
 
  // get other data
  Other() {
    this.businessCategoryServiceData = { "categoryid": this.categorys.main_category_id = 9 };
    this.businessService.conditionBusinessList(this.businessCategoryServiceData).subscribe((res: any) => {
      console.log(res);
      if (res.status == 'success') {
        this.conditionbusinesslist = res.data.user;
        this.navCtrl.navigateForward('/tabs/tab2');
      }
    });
  }
 
  // get professional data
  Professional() {
    this.businessCategoryServiceData = { "categoryid": this.categorys.main_category_id = 9 };
    this.businessService.conditionBusinessList(this.businessCategoryServiceData).subscribe((res: any) => {
      console.log(res);
      if (res.status == 'success') {
        this.conditionbusinesslist = res.data.user;
        this.navCtrl.navigateForward('/tabs/tab2');
      }
    });
  }
  
  // get goverment data
  Goverment() {
    this.businessCategoryServiceData = { "categoryid": this.categorys.main_category_id = 2 };
    this.businessService.conditionBusinessList(this.businessCategoryServiceData).subscribe((res: any) => {
      console.log(res);
      if (res.status == 'success') {
        this.conditionbusinesslist = res.data.user;
        this.navCtrl.navigateForward('/tabs/tab2');
      }
    });
  }
}
