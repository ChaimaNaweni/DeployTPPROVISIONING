import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/entity/user';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddUserRequest } from '../models/Request/AddUserRequest';
import { ValidatePasswordService } from './validate-password.service';
import { UpdateCurentuserRequest } from '../models/Request/UpdateCurent-userRequest';

/*****************************
 * 
 * @author Tarchoun Abir 
 * 
 **********/

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  //api backend
  private base_url = environment.publicApi + '/Users';

  constructor(private http: HttpClient,private v: ValidatePasswordService) { }

  //http opttion
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };
  //handel api  errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //a client-side or a neetwork error occurend .Handel it accordingly
      console.error('An Error occurend', error.error.message);
    } else {
      // the backend may returned an successfully response code
      // the response body may contain clues as to what went wrong
      console.error(
        `backend returned code ${error.status}, ` + `body was : ${error.error}`
      );
    }
    // return an observabel with a user-facing error message
    return throwError('something bad happined , please try again later .');
  }


  /***********************
   * 
   * CRUD OPORATION
   * 
   ****************/


  createNewUser(AddUserRequest : any): Observable<any> {
    return this.http.post( this.base_url + '/AddUser',AddUserRequest, this.httpOptions)
  }
  

  //get all  users
  GetallUsers(): Observable<any[]> {
    return this.http.get<User[]>(`${this.base_url}` + "/GetAllUser");
  }


  //update User Status 
  UpdateUserStatut(user:User){

    return this.http.put<User>(`${this.base_url}` + "/UpdateUserStatus",user);
  }

  //update currentUser info
  updateCurrentUser(item: any) {
    return this.http.put<UpdateCurentuserRequest>(`${this.base_url + "/Update-current-User"}`,item)

  }
  //delete user
  deleteUser(id: number) {
   
    return this.http.delete<User>(`${this.base_url}` + '/DeleteUser/' + id,this.httpOptions);
  
    
  }

  

  //validation formulaire
  form: FormGroup = new FormGroup({
    userId : new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    userStatus: new FormControl(''),
    password: new FormControl([
      Validators.required, 
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")
   ]),
   confirmPassword: new FormControl(
    ''
  ),
},
this.v.passwordMatch('password', 'confirmPassword')
    
  )


  /*************
   * 
   * matching passwords
   * 
   */
  get confirmPasswordControl() {
    return this.form.get('confirmPassword');
  }

  public getConfirmPasswordError() {
    const control : AbstractControl | null = this.confirmPasswordControl;
    return control?.hasError('required')
      ? 'Please confirm the  password'
      : control?.hasError('passwordMismatch')
      ? 'The passwords do not match'
      : '';
  }




  // inialisation formulaire
  initializeFormGroup() {
    this.form.setValue({
      userId: null,
      username: '',
      email: '',
      password:'',
      confirmPassword: '',
      userStatus:'',
    });
  }

  changeRole(userId: Number, role :any ){
    let result = this.http.put<any>(
      environment.publicApi + '/Users/UpdateUserRole',
      {
        
        userId,
        role 
      }
    );
    return result;
  }
  //get value for update
  populateForm(accountuser: any) {
    this.form.patchValue(accountuser);
  }
}
