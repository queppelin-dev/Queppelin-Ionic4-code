import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-appointmentmodal',
  templateUrl: './appointmentmodal.page.html',
  styleUrls: ['./appointmentmodal.page.scss'],
})
export class AppointmentmodalPage implements OnInit {

  constructor(public modelctr:ModalController,
              private translate: TranslateService) { }

  ngOnInit() {
  }
  closemodal(){
    this.modelctr.dismiss({
      'dismissed': true
    });
  }

}
