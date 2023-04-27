import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/entity/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  submitted = false;
  fieldTextType!: boolean;
  fieldTextType2!: boolean;
  accountData!: User;
  account: User[] = [];
  datasource = new MatTableDataSource(this.account);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort!: MatSort
  
  constructor(public userService: UserService, private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA)
    public data:  {
      userId: Number;
    }) { this.accountData = {} as User;
    
  }
  ngOnInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
    }

    onSubmit(): void {

      let userBody={
      username:this.userService.form.value.username,
      confirmPassword:this.userService.form.value.confirmPassword,
      password:this.userService.form.value.password,
      email:this.userService.form.value.email,
      createdDate:new Date(),
      lastModifiedDate:new Date(),
    };
    if (this.userService.form.valid) {
      this.userService.createNewUser(userBody).subscribe((response: any) => {
        console.log(response)
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
      });
    }
    this.onClose();
    window.location.href='/admin/users'
  }

  // show password 
  toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
  }

  // show password 
  toggleFieldTextType2() {
  this.fieldTextType2 = !this.fieldTextType2;
  }

  onClose() {
    this.dialogRef.close();
  }
 

  


}




