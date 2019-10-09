import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators/map';
import { Business } from '../models/business';
import { environment } from '../../environments/environment';
import { ServiceList } from '../models/servicelist';
import { BusinessReview } from '../models/businessreview';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  
  public headers:any;
  public businessData:any = {};
  public business_id:any;

  constructor( private http: HttpClient ) { 
    this.setHeaders();
  }

  // http headers
  setHeaders() {
    this.headers = new Headers();
    this.headers.append('Access-Control-Allow-Origin' , '*');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    this.headers.append('content-type','application/json');
    console.log(this.headers)
  }
  
  // business list 
  public businessList(): Observable<Business> {
    return this.http.get<Business>(environment.baseUrl + 'all-business-list')
    .pipe(
      tap(_ => console.log('success')),
      catchError(( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      })
    );
  }

  // conditional business list
  public conditionalBusinessList( businessData:any ): Observable<ServiceList> {
    const url = environment.baseUrl + "business-list";
    return this.http.post<ServiceList>( url, businessData,httpOptions ).pipe(
      tap( ( response: ServiceList ) => console.log( " Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // category list
  public category( servicelist: any ): Observable<any> {
    const url = environment.baseUrl + "categoryservices";
    return this.http.post<any>( url, servicelist,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Logged In" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }
  
  // service list
  public serviceList( servicelist:ServiceList ): Observable<ServiceList> {
    const url = environment.baseUrl + "serviceslist";
    return this.http.post<ServiceList>( url, servicelist,httpOptions ).pipe(
      tap( ( response: ServiceList ) => console.log( " Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // business review
  public businessReview(businessreview:any): Observable<any>{
    const url = environment.baseUrl + "business-review";
    return this.http.post<any>(url, businessreview,httpOptions).pipe(
      tap( ( response: any ) => console.log( "businessreview" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // business info
  public businessInfo(businessinfo:any): Observable<any> {
    const url = environment.baseUrl + "business-Info";
    return this.http.post<any>(url, businessinfo,httpOptions).pipe(
      tap( ( response: any ) => console.log( "businessinfo" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }
  
  // appointment list
  public appointmentList( appointmenData:any ): Observable<any> {
    console.log(this.headers);
    const url = environment.baseUrl + "appointment-list";
    return this.http.post<any>( url, appointmenData, { headers: this.headers } ).pipe(
      tap( ( response: any ) => console.log( "Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // add appointment
  public addAppointment( appointmenData:any ): Observable<any> {
    const url = environment.baseUrl + "add-appointment";
    return this.http.post<any>( url, appointmenData,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // add review
  public addReview( reviewData:any ): Observable<any> {
    const url = environment.baseUrl + "add-business-review";
    return this.http.post<any>( url, reviewData,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // reply review
  public replyReview( reviewData:any ): Observable<any> {
    const url = environment.baseUrl + "add-review-reply";
    return this.http.post<any>( url, reviewData,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }
 
  // review count
  public reviewCount(business_id:number): Observable<any> {
    const url = environment.baseUrl + "business-review-list";

    return this.http.get<any>( environment.baseUrl + "business-review-list/"+business_id ).pipe(
      tap( ( response: any ) => console.log( "Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  //conditional business list
  public conditionBusinessList(conditionbusinesslist):Observable<any>{
    const url = environment.baseUrl + "business-list";
    return this.http.post<any>( url, conditionbusinesslist,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // favorite business list without customer
  public favlistwithoutcustomer(){
    const url = environment.baseUrl + "favourite-business-list-without-customer";
    return this.http.get<any>( url ).pipe(
      tap( ( response: any ) => console.log( "Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // favorite business list with customer
  public favlistwithcustomer(favlistwithcustomer:any){
    const url = environment.baseUrl + "favourite-business-list";
    return this.http.post<any>( url, favlistwithcustomer,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // update profile image
  public profileimage(profileimage:any){
    const url = environment.baseUrl + "profile-image";
    return this.http.post<any>( url, profileimage,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // category list
  public categorylist(){
    const url = environment.baseUrl + "category-list";
    return this.http.get<any>( url ).pipe(
      tap( ( response: any ) => console.log( "Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // distance count
  public getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    if(d>1) {
      let distance =  Math.round(d)+" Km";
      return distance;
     } else if(d<=1) {
       let distance = Math.round(d*1000)+" Meters";
       return distance;
     }
  }
  
   public deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  // country list
  public counteryList(counteryData:any){
    const url = environment.baseUrl + "country-state-city";
    return this.http.post<any>( url, counteryData,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }
}