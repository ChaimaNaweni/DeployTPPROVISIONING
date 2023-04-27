
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/entity/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  roleSelected = null;
  account: User[] = [];
  selectedRole =0;
  constructor(
    public accountservice:UserService,
    public router: Router,
    public dialogRef: MatDialogRef<EditUsersComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      userId: Number;
      role: string;
    }
  ) { }

  ngOnInit(): void {
    console.log("roleee fetch************", this.fetchFirstRoleID())
    this.fetchFirstRoleID();
  }

  fetchFirstRoleID() {
    this.selectedRole = JSON.parse(this.data.role);
    console.log('fetchFirst role =>', this.selectedRole);
  }



  // change role 
  onChangeRole(event: any) {
    this.selectedRole= event.target.value;
    console.log('test on change role =>', event.target.value);
  }

  onSubmit() {
   /*if (
      Number(this.selectedRole) != Number(this.data.role)
    ) {*/
    this.accountservice.changeRole(
          this.data.userId,
          this.selectedRole
        ).subscribe((res) => {
          console.log('test ', res);
            (error: any) => {
              console.log('errr =>', error);
            };
        });
      
      
      this.onClose();

    }
  

    

  onClose() {
    this.dialogRef.close();
  }

}