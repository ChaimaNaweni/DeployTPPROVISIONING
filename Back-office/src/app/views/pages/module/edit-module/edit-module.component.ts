import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Module } from 'src/app/models/entity/module';
import { DialogService } from 'src/app/services/dialog.service';
import { ModuleService } from 'src/app/services/module.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.css']
})
export class EditModuleComponent implements OnInit {

  @ViewChild('moduleForm', { static: false })
  moduleForm !: FormGroup;
  moduleData !: Module;
  module: Module[] = [];
  searchKey!: string;
  showspinner = false;
  datasource = new MatTableDataSource(this.module)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort!: MatSort;

  constructor(private dialog: MatDialog, private dialogService: DialogService, public dialogRef: MatDialogRef<EditModuleComponent>,
    private notificationService: NotificationService,
    public moduleService: ModuleService, private router: Router) {
    this.moduleData = {} as Module;
  }

  // sorting + pagination data 
  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllmodule();

  }

  getAllmodule() {
    this.moduleService.getallModule().subscribe((response: any) => {
      this.datasource.data = response;
    })
  }


  //clear data
  onClear() {
    this.moduleService.form.reset();
    this.moduleService.initializeFormGroup();
  }

  // submit data with context EDITE
  onSubmit() {
    this.moduleService.updateModule(this.moduleService.form.value).subscribe((response) => {
      console.log(response);
      this.module.push(response);
      this.notificationService.success('  ::  ' + ' ' + ' module updated successfully ' + '⚡');
    });

    this.onClose();
    window.location.href = '/admin/modules'
  }

  // dialogue close 
  onClose() {
    this.dialogRef.close();

  }
}