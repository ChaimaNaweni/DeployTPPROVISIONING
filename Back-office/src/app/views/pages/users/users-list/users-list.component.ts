import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/entity/user';
import { UserService } from 'src/app/services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import Swal from 'sweetalert2';
import { EditUsersComponent } from '../edit-users/edit-users.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DropdownOption } from 'src/app/models/ui/dropdown-option';
import { userStatus } from 'src/app/models/entity/userStatus';
import { DropdownService } from 'src/app/services/drowpdown.service';
declare var $: any;

/*****************************
 * 
 * @author Tarchoun Abir 
 * 
 **********/

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  accountForm!: FormGroup;
  accountData!: User;
  account: User[] = [];
  searchKey!: string;
  showspinner = false;
  data: any;
  role !: string;
  accountlist !: User[];
  datasource = new MatTableDataSource(this.account);
  displayedColumns: string[] = [
    'username',
    'email',
    'level',
    'userStatus',
    'createdDate',
    'lastModificatedDate',
    'actions',
  ];

  //filter
  statusFilter = new FormControl('');
  filterValues: any = {
    userstatus: '',
  }

  currentUser !: User;
  dataLoading: boolean = true;
  availableuserStatus: DropdownOption[] = userStatus;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort!: MatSort;
  id = this.route.snapshot.params['id'];
  mybreakpoint!: number;
  lastModificatedDate: any;

  constructor(
    private dialog: MatDialog,
    public _Snackbar: MatSnackBar,
    private accountservice: UserService,
    private route: ActivatedRoute,
    public router: Router,
    public dropdownService: DropdownService,
    public dialogRef: MatDialogRef<AddUserComponent>
  ) {
    this.accountData = {} as User;
  }

  ngOnInit(): void {
    this.mybreakpoint = window.innerWidth <= 600 ? 1 : 6;
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
    this.getAllUsers();
    this.fieldListener();


  }

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }


  /*********************
   * Get All Users
   * 
   ***/

  getAllUsers() {

    this.accountservice.GetallUsers().subscribe((response) => {
      this.datasource.data = response;
      this.datasource.filterPredicate = this.createFilter();
    });
  }


  //search 
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  //apply filter
  applyFilter() {
    this.datasource.filter = this.searchKey.trim().toLowerCase();
  }


  /*************************
   * delete a user
   */
  onDelete(userId: number) {
    Swal.fire({
      title: 'Are you sure to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: 'gray'
    }).then((result) => {
      if (result.value) {
        this.accountservice.deleteUser(userId)
          .subscribe(
            response => {
              console.log(response);

              Swal.fire('Deleted!', ' Deleted successfully.', 'success');
              if (result.dismiss === Swal.DismissReason.cancel) {
              }
              this.getAllUsers()

            });

        window.location.href = '/admin/users'
      }

    });

  }

  /*************************
 * delete product
 */
  onDeleteProduct(userId: number) {
    Swal.fire({
      title: 'Are you sure to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: 'gray'
    }).then((result) => {
      if (result.value) {
        this.accountservice.deleteUser(userId)
          .subscribe(
            response => {
              console.log(response);

              Swal.fire('Deleted!', ' Deleted successfully.', 'success');
              if (result.dismiss === Swal.DismissReason.cancel) {
              }

              this.getAllUsers()

            });
        //snackBar success 
        this._Snackbar.open(" Deleted Successfully", + '' + "K" + '' + '⚡', {
          duration: 5000,
          horizontalPosition: "right",
          verticalPosition: "bottom",
          panelClass: ["mat-toolbar", "mat-success"],
        });
      }

    });

  }

  /************************
    * OnEdite PoP UP
    * 
    ***/

  onEdit(row: any) {
    this.accountservice.populateForm(row);
    console.log('the row ===>', JSON.stringify(row));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      userId: row.userId,
      role: JSON.stringify(row.role),
    };

    this.dialog.open(EditUsersComponent, dialogConfig);
  }



  /************************
   * On clear Form
   * 
   ***/

  onClear() {
    this.accountservice.form.reset();
    this.accountservice.initializeFormGroup();
  }

  /************************
   * Update User Status
   * 
   ***/

  updateaStatusAccount(element: User) {

    Swal.fire({
      title: 'Are you sure to update status  !?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes.',
      cancelButtonText: 'No.',
    }).then((result) => {
      if (result.value) {
        const index = this.datasource.data.indexOf(element);
        this.datasource.data[index].userStatus = this.changeStatut(this.datasource.data[index].userStatus);
        this.accountservice.UpdateUserStatut(this.datasource.data[index]).subscribe((res) => {

          console.log(res);

        });
        Swal.fire('updated!', ' status updated successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });


  }

  /****************************
   *  Switch Status
   * 
   ****/

  changeStatut(currentStatut: string) {
    if (currentStatut == "ACTIVE") {
      return "BLOCKED";
    }
    else if (currentStatut == "PENDING") {
      return "ACTIVE";
    }
    return "PENDING";
  }


  /***************************
  *  Dialog Config For create 
  * 
  ****/

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddUserComponent, dialogConfig);
    this.onClear()

  }

  /**********************************
   * Filter by UserStatus 
   * 
   *****************************/


  private fieldListener() {
    this.statusFilter.valueChanges
      .subscribe(
        userStatus => {
          this.filterValues.userStatus = userStatus;
          this.datasource.filter = JSON.stringify(this.filterValues);
        },

      )


  }

  createFilter(): (user: User, filter: string) => boolean {
    let filterFunction = function (this: any, user: any, filter: any): boolean {
      let searchTerms = JSON.parse(filter);
      return user.userStatus.indexOf(searchTerms.userStatus) !== -1;

    }

    return filterFunction;

  }

  clearFilter() {
    this.statusFilter.setValue('');
  }


}
