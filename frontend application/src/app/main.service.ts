import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MainService {

  public url = 'http://api.hiringadda.online/api/v1';

  constructor(public http:HttpClient) { }

  public setUserInfoInLocalStorage = (userDetails) =>{
    localStorage.setItem('userDetails', JSON.stringify(userDetails))
  };

  public getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('userDetails'));
  };

  /* ---------------     user api    ------------------ */

  public signupFunction (signupData):Observable<any> {
    return this.http.post(`${this.url}/signup`, signupData)
  }

  public loginFunction (loginData):Observable<any> {
    return this.http.post(`${this.url}/login`, loginData)
  }

  public getAllUsers ():Observable<any> {
    return this.http.get(`${this.url}/users/all`)
  }

  public logout (activeUserData):Observable<any> {
    return this.http.post(`${this.url}/logout`, activeUserData)
  }

  public forgotPassword(userData):Observable<any> {
    return this.http.post(`${this.url}/forgotpassword`, userData)
  }

  public resetPassword(userData):Observable<any> {
    return this.http.post(`${this.url}/resetpassword`, userData)
  }

  /* ---------------     meeting api    ------------------ */

  public createMeeting (newMeetingData):Observable<any> {
    return this.http.post(`${this.url}/meeting/create`, newMeetingData)
  }

  public getMeetingsOfUser(userId):Observable<any> {
    return this.http.get(`${this.url}/meeting/all/${userId}`)
  }

  public deleteMeeting(meetingIdData):Observable<any> {
    return this.http.post(`${this.url}/meeting/delete/`, meetingIdData)
  }

  public getMeeting(meetingId):Observable<any>{
    return this.http.get(`${this.url}/meeting/${meetingId}`)
  }

  public updateMeeting(updateMeetingData, meetingId):Observable<any>{
    return this.http.post(`${this.url}/meeting/update/${meetingId}`, updateMeetingData)
  }
  

  /* ---------------      misc. api     ------------------ */

  public getCountries(): any {
    return this.http.get('./assets/countryNames.json');
  }

  public getCountryCodes(): any {
    return this.http.get('./assets/countryPhoneCodes.json');
  }

}
