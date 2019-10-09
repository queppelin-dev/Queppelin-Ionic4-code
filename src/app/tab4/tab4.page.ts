import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  public language:string;
  public userDetails:any ={};
  public imagedata:any = {};
  public imagedetails:any;
  public showphotopath:boolean = false;
  selectedFile:File = null;
  constructor( public navCtrl:NavController,
               private translate: TranslateService,
               public userService: UserService ) { 

                this.language = localStorage.getItem("language");
                if(this.language == 'ar') {
                  document.documentElement.dir = 'rtl';
                } 
               else if(this.language == 'en') {
                  document.documentElement.dir = 'ltr';
                } 
                this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
               }

  ngOnInit() {
  }

  // open account details page
  goToAccountDetailPage() {
    this.navCtrl.navigateForward('/account-details');
  }

  // open review page
  goToReviewPage(){
    this.navCtrl.navigateForward('/review');
  }

  // open address page
  goToAddressPage() {
    this.navCtrl.navigateForward('/address');
  }

  //open about page
  goToAboutPage() {
    this.navCtrl.navigateForward('/about');
  }

  // open setting page
  goToSettingPage() {
    this.navCtrl.navigateForward('/settings');
  }

  // open feedback page
  goToFeedabackPage() {
    this.navCtrl.navigateForward('/feedback');
  }

// open file chooser
  onFileSelected(event){
    console.log(event);
    this.selectedFile =<File>event.target.files[0];

  }

  // file upload
  uploadimage(){
    const fd= new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name)
    if(this.userDetails){
      this.imagedata = {
        "user_id":this.userDetails.id, 
         "image_name":this.imagedata.upimgfile,"token":this.userDetails.token.original.token
        }
      }
      console.log('image', this.imagedata);
      this.userService.profileimage(this.imagedata,fd).subscribe((res:any)=>{
        console.log(res);
      if(res.status == "success"){
        this.imagedetails = res.data.user;
        console.log('image',this.imagedetails);
       
    }
  });
}

// logout
logout(){
  localStorage.clear();
  this.navCtrl.navigateForward('tabs/tab1');
}

}
