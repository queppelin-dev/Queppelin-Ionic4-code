import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ratemodal',
  templateUrl: './ratemodal.page.html',
  styleUrls: ['./ratemodal.page.scss'],
})
export class RatemodalPage implements OnInit {
  public rate:number = 0;

  constructor( public modelctr:ModalController,
               private translate: TranslateService) { }

  ngOnInit() {
  }
  onRateChange(event) {
    console.log('Your rate:', event);
  }
  closemodal(){
    this.modelctr.dismiss();
  }
}
