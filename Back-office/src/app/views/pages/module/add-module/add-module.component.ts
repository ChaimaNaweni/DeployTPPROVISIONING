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
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {

  @ViewChild('moduleForm', { static: false })
  moduleForm !: FormGroup;
  moduleData !: Module;
  module:Module[] = [];
  searchKey!: string;
  showspinner = false;
  datasource = new MatTableDataSource(this.module)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort!: MatSort;

  constructor(private dialog: MatDialog, private dialogService: DialogService,  public dialogRef: MatDialogRef<AddModuleComponent>,
    public moduleService: ModuleService) {
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

  // submit data with context EDITE : CREATE
  onSubmit() {
    let moduleBody={
   
    description:this.moduleService.form.value.description,
    modulePackage:this.moduleService.form.value.modulePackage,
    moduleName:this.moduleService.form.value.moduleName,
    moduleStatut : this.moduleService.form.value.moduleStatut,
    createdDate:new Date(),
    lastModificatedDate:new Date(),
  };
    if (this.moduleService.form.valid) {
      if (!this.moduleService.form.get('id')?.value) {
        console.log(moduleBody);
        this.moduleService.createModule(moduleBody).subscribe((res) => {
          console.log(res);
          this.module.push(res);
         
        });
      }
    }
    this.onClose();
   window.location.href='/admin/modules'
  }

  // dialogue close 
  onClose() {
    this.dialogRef.close();


    }
    }
