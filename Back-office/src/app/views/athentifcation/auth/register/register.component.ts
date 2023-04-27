import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

/***
 * 
 * @author Tarchoun Abir 
 * 
 ***/

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
    //form initialiaze
    form: any = {
      username: "",
      email: "",
      fiscaleCode: "",
      password:"",  
      matchingPassword: ""}
  
    fieldTextType!: boolean;
    fieldTextType2!: boolean;
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';
   
  
    constructor(private authService: AuthService, private _snackBar :MatSnackBar) { 
    }
     ngOnInit() {
      $('body').addClass('empty-layout bg-silver-100');
    }
  
    ngAfterViewInit() { }
  
    ngOnDestroy() {
      $('body').removeClass('empty-layout bg-silver-100');
    }
  
    onSubmit(): void {
      const {
        username, email, password,
        matchingPassword,
        fiscaleCode } = this.form;
  
      this.authService.create(username, email, password, matchingPassword, fiscaleCode).subscribe(
        (data: any) => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
  
        (err: { error: { text: string; }; }) => {
          //get error from backend : inactivate account || blocked account
          if (err.error.text) {
              console.log(err.error.text)
              this._snackBar.open(err.error.text, '', {
              duration: 4000,
              horizontalPosition: "center",
              verticalPosition: "top",
              panelClass: ['mat-toolbar', 'mat-warn']
  
            });
            return
          }
        });
  
    }
  
    // show password 
    toggleFieldTextType() {
      this.fieldTextType = !this.fieldTextType;
    }
  
    // show password 
    toggleFieldTextType2() {
      this.fieldTextType2 = !this.fieldTextType2;
    }
  
    login(){
      window.location.href='/login'
    }
  
  }
