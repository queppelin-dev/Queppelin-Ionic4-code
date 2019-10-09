import { PopoverController } from '@ionic/angular';
import { LanguageService } from './../language.service';
import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-language-popover',
  templateUrl: './language-popover.page.html',
  styleUrls: ['./language-popover.page.scss'],
})
export class LanguagePopoverPage implements OnInit {
  languages:any = [];
  selected = '';
  
  constructor(private languageService: LanguageService, private popoverCtrl: PopoverController) { }
 
  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }
 
  // select language
  select(lng) {
    this.languageService.setLanguage(lng);
    if (this.languages == 'en') {
      document.documentElement.dir = 'ltr';
    }
    else {
      document.documentElement.dir = 'rtl';
    }
    this.popoverCtrl.dismiss();
  }
 
}