import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Module } from '../models/entity/module';

/**
 * 
 * @Author Tarchoun Abir
 * 
 */
  
@Injectable({
  providedIn: 'root'
})
export class ModuleService {

 //api backend
    private base_url = environment.publicApi+ '/Module';
  
  
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
    createModule(item: any): Observable<Module> {
    
      return this.http.post<Module>(`${this.base_url}` + '/addNewModule' , item, this.httpOptions).pipe(retry(2), catchError(this.handleError));
    }
  
    //get all data 
    getallModule(): Observable<Module[]> {
      return this.http.get<Module[]>(`${this.base_url}` + '/GetAllModules').pipe(retry(2), catchError(this.handleError));
    }
  
  
    // get by id
    getByidModule(id: number): Observable<Module> {
      return this.http.get<Module>(`${this.base_url}` + '/GetModuleByOne/' + id).pipe(retry(2), catchError(this.handleError));
  
  
    }
  
    // update by Id 
    updateModule( item: Module) {
      return this.http.put<Module>(`${this.base_url}` + '/UpdateModule' + '/' + item.moduleId,item, this.httpOptions).pipe(retry(2), catchError(this.handleError));
    
    }
    // delete Module
    deleteModule(id: number) {
      return this.http.delete<Module>(`${this.base_url}` + '/DeleteModule/' + id, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  
    }
   
  
  
    populateForm(Module: any) {
      this.form.patchValue(_.omit(Module));
    }
  
    
       
     //validation formulaire
     form: FormGroup = new FormGroup({
      moduleId: new FormControl(null),
      description: new FormControl('', Validators.required),
      moduleName: new FormControl('', [Validators.required]),
      modulePackage: new FormControl('', [Validators.required]),
      createdDate: new FormControl(''),
      lastModificatedDate: new FormControl(''),
     // moduleStatut: new FormControl(false)
  
  
  
    });
  
    // inialisation formulaire 
    initializeFormGroup() {
      this.form.setValue({
        moduleId: null,
        moduleName: '',
        description: '',
        modulePackage:'',
        //moduleStatut: '',
        lastModificatedDate: '',
        createdDate:''
      });
    }
  
  }
