import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'location',
    pathMatch: 'full'
  },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tabs/tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'tabs/tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'location', loadChildren: './location/location.module#LocationPageModule' },
  { path: 'language-popover', loadChildren: './language-popover/language-popover.module#LanguagePopoverPageModule' },
  { path: 'account-details', loadChildren: './account-details/account-details.module#AccountDetailsPageModule' },
  { path: 'review', loadChildren: './review/review.module#ReviewPageModule' },
  { path: 'address', loadChildren: './address/address.module#AddressPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'payments', loadChildren: './payments/payments.module#PaymentsPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackPageModule' },
  { path: 'ratemodal', loadChildren: './modal/ratemodal/ratemodal.module#RatemodalPageModule' },
  { path: 'bookappointment', loadChildren: './bookappointment/bookappointment.module#BookappointmentPageModule' },
  { path: 'details-page', loadChildren: './details-page/details-page.module#DetailsPagePageModule' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'appointmentmodal', loadChildren: './modal/appointmentmodal/appointmentmodal.module#AppointmentmodalPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
