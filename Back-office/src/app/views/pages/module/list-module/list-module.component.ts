import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Module } from 'src/app/models/entity/module';
import { AddModuleComponent } from '../add-module/add-module.component';
import { ModuleService } from 'src/app/services/module.service';
import { EditModuleComponent } from '../edit-module/edit-module.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-module',
  templateUrl: './list-module.component.html',
  styleUrls: ['./list-module.component.css']
})
export class ListModuleComponent implements OnInit {
  moduleForm!: FormGroup;
  moduleData!: Module;
  module: Module[] = [];
  searchKey!: string;
  showspinner = false;
  ModuleList = [];
  data: any;
  datasource = new MatTableDataSource(this.module);
  displayedColumns: string[] = [
    'moduleName',
    'modulePackage',
    'description',
    'createdDate',
    'lastModificatedDate',
    'actions',
  ];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort!: MatSort;
  mybreakpoint!: number;

  constructor(
    private dialog: MatDialog,
    public _Snackbar: MatSnackBar,
    private moduleService: ModuleService,
    private route: ActivatedRoute,
    public router: Router,
    public dialogRef: MatDialogRef<AddModuleComponent>) { }


  ngOnInit(): void {
    this.mybreakpoint = window.innerWidth <= 600 ? 1 : 6;
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
    this.getAllModules();
  }
  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }


  /*********************
   * Get All Modules
   * 
   ***/

  getAllModules() {
      this.moduleService.getallModule().subscribe((response) => {
      this.datasource.data = response;
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


  /************************
   * OnDelete User
   * 
   ***/
  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure to delete this module?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: 'gray'
    }).then((result) => {
      if (result.value) {
        this.moduleService.deleteModule(id)
          .subscribe(
            (response) => {
              console.log(response);
              this.ModuleList.push();
              Swal.fire('Deleted!', ' Deleted successfully.', 'success');
              if (result.dismiss === Swal.DismissReason.cancel) {
              }
            });
      }
      location.href = '/admin/modules'
    });

  }


  /************************
    * OnEdite PoP UP
    * 
    ***/

  onEdit(row: any) {
    this.moduleService.populateForm(row);
    console.log('the row ===>', JSON.stringify(row));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EditModuleComponent, dialogConfig);
  }



  /************************
   * On clear Form
   * 
   ***/

  onClear() {
    this.moduleService.form.reset();
    this.moduleService.initializeFormGroup();
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
    this.dialog.open(AddModuleComponent, dialogConfig);
    this.onClear()

  }



}
