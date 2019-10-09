import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController,NavParams } from '@ionic/angular';
import { AppointmentmodalPage } from '../modal/appointmentmodal/appointmentmodal.page';
import { TranslateService } from '@ngx-translate/core';
import { BusinessService } from '../services/business.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public today = new Date();
  public todaydate :  any;
  public themes:string = 'black';
  public Appointment:boolean = true;
  public editAppointment:boolean = false;
  public userDetails:any = {};
  public appointmentData:any = {};
  public appointmentDatas:any = {};
  appointmentlist:any;
  public shownoappointment:boolean = false;
  public showappointment:boolean = false;
  public todayData: any = [];
  public upcomingData: any = [];
  public with_service:any = [];
  public businessDetails:any = [];
  public businessData:any = [];
  public appintmentData:any ={};
  constructor( public navCtrl:NavController,
               public modalCtrl: ModalController,
               private translate: TranslateService,
               public businessService:BusinessService,
               public route:Router) {
    this.themes = localStorage.getItem("themes");
    this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
    console.log('user',this.userDetails); 
    this.businessData = JSON.parse(localStorage.getItem("businessData"));
    console.log('data',this.businessData);
    this.appintmentData = JSON.parse(localStorage.getItem("appintmentData"));
    console.log('appoint', this.appintmentData);
    
         }
  ngOnInit() {
    this.getAppointmentList();
    var date = new Date()
    this.todaydate =  date.getUTCFullYear() + '-' + (date.getUTCMonth()+1) + '-' + date.getUTCDate();
  }

  // open edit  appointment section
  goToEditAppointmentPage() {
    this.Appointment = false;
    this.editAppointment = true;
  }

  // open appointment page section
  goToAppointmentPage(){
     this.editAppointment = false;
     this.Appointment = true;

  }
  
  // cancel appointment model
  async cancelAppointment() {
    const modal = await this.modalCtrl.create({
      component: AppointmentmodalPage,
      cssClass: 'my-custom-modal-css'
    });
    
    modal.onDidDismiss().then((data) => {
    console.log(data);
    this.goToAppointmentPage();
    })

    return await modal.present();
  }
  
  // open tab3 section
  goToTab3Page(){
    this.editAppointment = false;
    this.Appointment = true;
  }
 
  // change appointment 
  changeAppointments() {
    this.navCtrl.navigateForward('/bookappointment');
  }
 
  // get appointment list
  getAppointmentList(){
    
     if(this.userDetails) {
      this.appointmentDatas = {
       "user_id":this.userDetails.id, 
        "role_id":this.userDetails.role_id, "token":this.userDetails.token.original.token
       }
       console.log( 'apdata',this.appointmentDatas)
        this.businessService.appointmentList( this.appointmentDatas ).subscribe((res : any)=> {
          console.log(res);
          if(res.status == 'success')
          {
          this.appointmentlist = res.data.user;
          console.log('list',this.appointmentlist);
          localStorage.setItem("appointmentlist", JSON.stringify(this.appointmentlist));
          this.showappointment = true;
          this.shownoappointment = false;
      
          for( let i=0; i < this.appointmentlist.length; i++){            
            let item = new Date(this.appointmentlist[i].appointment_date).getTime();
            let today = new Date(this.todaydate).getTime();
   
            if(item == today){
              this.todayData.push(this.appointmentlist[i]);
            }
            if(item != today){
              this.upcomingData.push(this.appointmentlist[i]);
            }
            
          }
          console.log(this.todayData);
            console.log(this.upcomingData)
        }
        else if(res.status == 'fail'){
        this.showappointment = false;
        this.shownoappointment = true;
      }
    }); 
  } 
 
    
}
}

