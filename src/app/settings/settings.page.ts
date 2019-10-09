import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
import { DetailsPagePage } from '../details-page/details-page.page';
import { LanguagePopoverPage } from '../language-popover/language-popover.page';
import { PopoverController, AlertController } from '@ionic/angular';
import { LanguageService } from './../language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public personalinformationsData:any = {};
  public personalinformations:any = {};
  public userDetails:any ={};
  public checked:boolean = true;
  public abc:any={};
  public language: string;
  languages = [];
  selected = '';
  constructor( private translate: TranslateService,
               public userService: UserService,
               private popoverCtrl: PopoverController,
                private alertCtrl: AlertController,
                private languageService: LanguageService) { 
                this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
                console.log( this.userDetails);
               
          
               }

  ngOnInit() {
    this.getPersonalInformation();
  }
  ionViewDidEnter() {
  }

// get personal info
 getPersonalInformation() {
    if(this.userDetails){
    this.personalinformationsData = {
     "user_id": this.userDetails.id,
      "role_id": this.userDetails.role_id,
    "token":this.userDetails.token.original.token
   };
   console.log(this.personalinformationsData);
  }
  this.userService.personalInformation(this.personalinformationsData).subscribe((res:any)=>{
    console.log(res);
    if(res.status == 'success'){
      this.personalinformations = res.data.user.notification_setting;
    }

  });
  }
  changeToggle(personalinformations:any){
    console.log(personalinformations)
}

// open select language popover
async openLanguagePopover(ev) {
  const popover = await this.popoverCtrl.create({
  component: LanguagePopoverPage,
  event: ev
  });
  await popover.present();
}

}
