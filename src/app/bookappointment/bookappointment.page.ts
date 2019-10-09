import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BusinessService } from '../services/business.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.page.html',
  styleUrls: ['./bookappointment.page.scss'],
})
export class BookappointmentPage implements OnInit {
  public applyclass:boolean = false;
  public applyclasses:boolean = true;
  public appointmentDate:Date;
  public appointmentTime:any;
  public userDetails:any = {};
  public appintmentData:any = {};
  public serviceDetails:any = {};
  public serviceList:any = {};
  public language: string;
  public servicedetail:any = [];
  public staffdetail:any = [];
  public businessDetails:any = [];
  public appointmentDatas:any ={};
  public appointmentlist:any ={};
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];seletctedDate
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  @ViewChild(CalendarComponent, { read: true, static: false }) myCal: CalendarComponent;
  constructor( private alertCtrl: AlertController,
              @Inject(LOCALE_ID) private locale: string,
              public navCtrl:NavController,
              private translate: TranslateService,
              public businessService:BusinessService,
              private route: ActivatedRoute,
              private router: Router) { 

      this.route.queryParams.subscribe(params => {
        if (params && params.serviceDetails) {
          this.serviceDetails = JSON.parse(params.serviceDetails);
          console.log('servicedetails',this.serviceDetails);
          for (let i=0;i<this.serviceDetails.length;i++){
            this.servicedetail.push(this.serviceDetails[i].id);
            this.staffdetail.push(0);
          }
        }
      });  

      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
      this.language = localStorage.getItem("language");

      if( this.language == 'ar') {
        this.applyclasses = false;
        this.applyclass = true;  
      }
  }

  ngOnInit() {
  }

  //reset event
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  // current date change
  onCurrentDateChanged(event:Date) {
    var date = event;
    var date1 =  event.getUTCFullYear() + '-' + event.getUTCMonth() + '-' + event.getUTCDate();
    this.appointmentDate = event;
  }

  // select time
  selectTime(time:any) {
   this.appointmentTime = time;
  }

  // add appointment 
  addAppointment() {
    if(this.appointmentTime) {
      if(this.userDetails){
        this.appintmentData = {
          "appointment_date":this.appointmentDate,
          "business_time":this.appointmentTime,
          "business_id":this.serviceDetails[0].business_id,
          "user_id":this.userDetails.id,
          "role_id":this.userDetails.role_id,
          "services_id":this.servicedetail,
          "Staff_id": this.staffdetail,
          "token":this.userDetails.token.original.token,
          "comment":this.appintmentData.comment
        };
        this.businessService.addAppointment( this.appintmentData ).subscribe((res : any)=> {
          console.log(res.data.user);
          if(res.status == "success") {
            this.appintmentData = res.data.user;
            console.log('appoint',this.appintmentData);
            localStorage.setItem("appintmentData", JSON.stringify(this.appintmentData));
            this.getAppointmentList();
          }
          if(res.data.user == null){
            alert('first,log in Signin Page');
            this.navCtrl.navigateForward('/signin');
          } 
        }); 
      } else {
        this.navCtrl.navigateForward('/signin');
      }     
    } else {
      alert("Please select appointment time")
    }   
  }

  // Add event 
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }
 
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
 
    this.eventSource.push(eventCopy);
    this.resetEvent();
  }

  // navigation on details page
  addService(){
    this.navCtrl.navigateForward('/details-page');
  }

  // get appointment list
  getAppointmentList(){
    if(this.userDetails) {
     this.appointmentDatas = {
      "user_id":this.userDetails.id, 
       "role_id":this.userDetails.role_id, "token":this.userDetails.token.original.token
      }
    }
    console.log( 'apdata',this.appointmentDatas)
    this.businessService.appointmentList( this.appointmentDatas ).subscribe((res : any)=> {
      console.log(res);
      if(res.status == 'success')
      {
      this.appointmentlist = res.data.user;
      console.log('list',this.appointmentlist);
      localStorage.setItem("appointmentlist", JSON.stringify(this.appointmentlist));
      this.navCtrl.navigateForward('tab1');
      }
    });
  }
}
