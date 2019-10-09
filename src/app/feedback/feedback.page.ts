import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
import { RatemodalPage } from '../modal/ratemodal/ratemodal.page';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  public feedback:boolean = false;
  public feedbackandsupport:boolean = true;
  public feedbackdata:any = {};
  public userDetails:any = {};
  public feedbackdetails:any ={};

  constructor(public modalCtrl: ModalController,
              private translate: TranslateService,
              public userService: UserService,
              public navctrl:NavController) {
                this.userDetails = JSON.parse(localStorage.getItem("userDetails"));

               }
 
  ngOnInit() {
  }

  // open rating modal
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: RatemodalPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  //open send feedback section
  sendfeedback(){
    this.feedbackandsupport = false;
   this.feedback = true; 
  }

  // submit feedback
  submitfeedback(){
    if(this.userDetails){
    this.feedbackdata = {
      "user_id":this.userDetails.id, 
       "role_id":this.userDetails.role_id, "token":this.userDetails.token.original.token,
       "type":this.feedbackdata.type,"description":this.feedbackdata.description
      }
    }
    this.userService.feedback(this.feedbackdata).subscribe((res:any)=>{
      console.log(res);
    if(res.status == "success"){
      this.feedbackdetails = res.data.user;
      console.log(this.feedbackdetails);
      this.feedback = false; 
      this.feedbackandsupport = true;
    }
    else if(res.status == "fail"){
      alert("token is expired,first you have to login")
      this.navctrl.navigateForward('/signin');
    }
   });
  }
}

