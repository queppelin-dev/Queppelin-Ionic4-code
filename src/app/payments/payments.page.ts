import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
 public onlinepage:boolean  = true;
 public showHeader:boolean  = true;
 public paymentPage:boolean = false;
 public cardsuccess:boolean = false;
 public cardfail:boolean = false;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  // navigation to card success page
  gotoCardSuccessPage(){
    this.onlinepage = false;
    this.showHeader = false;
    this.paymentPage = false;
    this.cardsuccess = true;
  }

  // navigation to payment section
  goTOpaymentPage(){
    this.onlinepage = false;
    this.showHeader = true;
    this.paymentPage = true;
    this.cardsuccess = false;
  }
}
