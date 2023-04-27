import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
//variale for test validation robots
//declare var grecaptcha: any;
/**
 * 
 * @author Tarchoun Abir
 * 
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  protected f!: FormGroup;
  form: any = {
    username: '',
    password: '',
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role =[];
  username?: string;
  captchaError: boolean = false;
  password?: string;
  recaptchaResponse = '';
  fieldTextType!: boolean;
  accountStatus!: string;
  siteSecret: string = '6Lc5l5AfAAAAAHOzhA9CEDiwe3n-W6GKdbQadMeq';
  showUserBoard = true;
  data: any;

  constructor(
    private notfication: NotificationService,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    public router: Router,
    public _location: Location,
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    
    $('body').addClass('empty-layout bg-silver-100');

  }


  ngAfterViewInit() { }

  ngOnDestroy() {
    $('body').removeClass('empty-layout bg-silver-100');
  }
  // show password
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  //post login
  onSubmit(): void {
    const { username, password } = this.form;

    //constant response for test robots
    //const response = grecaptcha.getResponse();
    //debugger;

    //test validation recaptcha
    //if (response.length === 0) {
    //  this.captchaError = true;
    //   return;
    // }

    this.authService.login(username, password).subscribe(
      (data: any) => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
 
        //recuperation response
        // this.recaptchaResponse = response;
        
       console.log(data.token,"********************************")
        
       console.log(data,"********************************")
      
        //======
        if (data.role[0] === 'client') {
          this.router.navigate(['/client']);
          return;
        } else if (data.role === 'admin') {
          this.router.navigate(['/admin/users']);
          this.notfication.success(' welcome ! ' + data.role + ' your logged  in successfully ');
          return;

        }
        this.reloadPage()

      },

      (err) => {
        //get error from backend : inactivate account || blocked account
        if (err.error.text) {
          console.log(err.error.text);
          this._snackBar.open(err.error.text, '', {
            duration: 7000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-warn'],
          });
          return;
        }
        //  login failed if username or password not valid
        else if ((this.isLoginFailed = true)) {
          this._snackBar.open('INVALID CREDENTIALS', '', {
            duration: 7000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-warn'],
          });
        }
      }
    );
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
  }

  //reload pages
  reloadPage() {
    window.location.reload();
  }

  //succes notification
  successNotification() {
    Swal.fire('welcome', ' you have been logged successfully ', 'success');
  }

  //refrech
  refresh(): void {
    this.router
      .navigateByUrl('/refresh', { skipLocationChange: true })
      .then(() => {
        console.log(decodeURI(this._location.path()));
        this.router.navigate([decodeURI(this._location.path())]);
      });
  }
}