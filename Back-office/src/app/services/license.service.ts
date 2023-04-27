import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { License } from '../models/entity/license';

@Injectable({
  providedIn: 'root'
})
/**
 * 
 * @Author Tarchoun Abir
 * 
 */
  

export class LicenseService {


 //api backend
 private base_url = environment.privateApi+ '/Licenses';
  
 constructor(private http: HttpClient) { }
  
    //http opttion
    httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
  
      })
    }
    //handel api  errors 
    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        //a client-side or a neetwork error occurend .Handel it accordingly
        console.error('An Error occurend', error.error.message)
  
      }
      else {
        // the backend may returned an successfully response code 
        // the response body may contain clues as to what went wrong 
        console.error(`backend returned code ${error.status}, ` +
          `body was : ${error.error}`
        );
      }
      // return an observabel with a user-facing error message 
      return throwError('something bad happined , please try again later .');
    };
  
  
    // insert 
    createLicense(item: any): Observable<License> {
    
      return this.http.post<License>(`${this.base_url}`, item, this.httpOptions).pipe(retry(2), catchError(this.handleError));
    }
  
    //get all data 
    getallLicense(): Observable<License[]> {
      return this.http.get<License[]>(`${this.base_url}`).pipe(retry(2), catchError(this.handleError));
    }
  
  
  
    // update by Id 
    updateLicense(item: License) {
      return this.http.put<License>(`${this.base_url}`, item, this.httpOptions).pipe(retry(2), catchError(this.handleError));
    }
  
    // delete License
    deleteLicense(id: number) {
      return this.http.delete<License>(`${this.base_url}` + '/' + id, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  
    }
   
  
  
    populateForm(License: any) {
      this.form.patchValue(_.omit(License));
    }
  
    
       
     //validation formulaire
     form: FormGroup = new FormGroup({
      id: new FormControl(null),
      description: new FormControl('', Validators.required),
      licenseKey: new FormControl('', [Validators.required]),
  
    });
  
    // inialisation formulaire 
    initializeFormGroup() {
      this.form.setValue({
        id: null,
        licensekey : '',
        description: '',
      });
    }
  
  }


