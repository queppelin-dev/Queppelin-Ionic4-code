import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguagePopoverPageModule } from './language-popover/language-popover.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { IonicRatingModule } from 'ionic4-rating';
import { RatemodalPage } from './modal/ratemodal/ratemodal.page';
//import { Calendar } from '@ionic-native/calendar';
import { Calendar } from '@ionic-native/calendar';
import { AppointmentmodalPage } from './modal/appointmentmodal/appointmentmodal.page';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

const firebaseConfig = {
  apiKey: "AIzaSyCFwW0HZMuakyZ7jRGuEFiSqIRpEfk8AHU",
  authDomain: "shedulix.firebaseapp.com",
  databaseURL: "https://shedulix.firebaseio.com",
  projectId: "shedulix",
  storageBucket: "",
  messagingSenderId: "614341758035",
  appId: "1:614341758035:web:01fab273b843d122"
};

@NgModule({
  declarations: [AppComponent,RatemodalPage,AppointmentmodalPage],
  entryComponents: [RatemodalPage,AppointmentmodalPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    IonicRatingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }), LanguagePopoverPageModule,
   
    ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    DatePicker,
    UserService,
    GooglePlus,
    LocationAccuracy,
    Diagnostic,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   // Calendar
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
