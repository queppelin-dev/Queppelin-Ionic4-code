import { Component, OnInit } from '@angular/core';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { NavController } from '@ionic/angular';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { PopoverController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LanguageService } from './../language.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
selector: 'app-location',
templateUrl: './location.page.html',
styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  public location:boolean = true;
  public locationEnable:boolean = false;
  public themes:string = 'black';
  public currentlocation:any;

  constructor( private locationAccuracy: LocationAccuracy,
  public navCtrl:NavController,
  private diagnostic: Diagnostic,
  private translate: TranslateService,
  private popoverCtrl: PopoverController,
  private alertCtrl: AlertController,
  private languageService: LanguageService,
  private geolocation: Geolocation ) {}

  ngOnInit() {
    localStorage.setItem("language", 'en');
    this.languageService.setLanguage('en');
    
  }

  // enable location setting
  enableLocation(){
    this.diagnostic.isLocationEnabled().then((yes) => {
    if(!yes) {
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      this.location = false;
      this.locationEnable = true;
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => { 
          this.getCurrentlocation();
        console.log('Request successful');
        this.navCtrl.navigateForward('/tabs');
      },
      error => console.log('Error requesting location permissions')
      ); 
    });
    }
    if(yes){
      this.location = false;
      this.locationEnable = false;
      this.navCtrl.navigateForward('/tabs');
      }
    });
  }

  // navigation on tabs page
  gototabs(){
    this.location = false;
    this.locationEnable = false;
    this.navCtrl.navigateForward('/tabs');
  }

  //open language popover
  async openLanguagePopover(ev) {
    const popover = await this.popoverCtrl.create({
    component: LanguagePopoverPage,
    event: ev
    });
    await popover.present();
  }

  //set themes
  setThemes(option) {
    if( option == 'white') {
    this.themes = 'white';
    localStorage.setItem("themes", this.themes );
    } else if( option == 'black') {
    this.themes = 'black';
    localStorage.setItem("themes", this.themes );
    }

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