import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of, observable } from 'rxjs';
import { catchError, tap,map } from 'rxjs/operators';
import { User } from '../models/user';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient ) { }

  // login user
  public login( user: any ): Observable<any> {
    const url = environment.baseUrl + "login";
    return this.http.post<any>( url, user,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Logged In" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // register user
  public register( user: any ): Observable<any> {
    const url = environment.baseUrl + "register";
    return this.http.post<any>( url, user,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Logged In" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // send otp
  public sendOtp(sendotp:any): Observable<any> {
    const url = environment.baseUrl + "send-otp";
    return this.http.post<any>( url, sendotp,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Logged In" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // login with mobile
  public loginCheckMobile(loginmobile:any):Observable<any> {
    const url = environment.baseUrl + "login-check-mobile";
    return this.http.post<any>( url, loginmobile,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Login with mobile" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // account details
  public accountDetails(accountDetails:any):Observable<any> {
    const url = environment.baseUrl + "account-details";
    return this.http.post<any>( url, accountDetails,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  } 

  // personal details
  public personalDetails(personaldetails:any):Observable<any> {
    const url = environment.baseUrl + "personal_detail";
    return this.http.post<any>( url, personaldetails,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Login with mobiles" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // personal info
  public personalInformation(personalinformations:any):Observable<any> {
    
    return this.http.get<any>( environment.baseUrl+'personal-information?user_id='+personalinformations.user_id+'&role_id='+personalinformations.role_id+'&token='+personalinformations.token).pipe(
      tap( ( response: any ) => console.log( "Login with mobiles" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // submit feedback
  public feedback(feedback:any):Observable<any> {
    const url = environment.baseUrl + "feedback";
    return this.http.post<any>( url, feedback,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // personal review
  public personalReview(personalreview:any):Observable<any> {
    
    return this.http.get<any>( environment.baseUrl+'personal-review?user_id='+personalreview.user_id+'&role_id='+personalreview.role_id+'&token='+personalreview.token).pipe(
      tap( ( response: any ) => console.log( "Login with mobiles" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // update address
  public updateAddress(addressData:any){
    const url = environment.baseUrl + "personal-address";
    return this.http.post<any>( url, addressData,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }
  
 // update profile image
  public profileimage(profileimage:any,fd):Observable<any> {
    const url = environment.baseUrl + "profile-image";
    return this.http.post<any>( url, profileimage,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }

  // login with fb
  public loginWithFB(fbData:any){
    const url = environment.baseUrl + "fb/callback";
    return this.http.post<any>( url, fbData,httpOptions ).pipe(
      tap( ( response: any ) => console.log( "Success" ) ),
      catchError( ( e: Error ) => {
        console.error( "Error occurred: ", e );
        throw e;
      } )
    );
  }
 
}



