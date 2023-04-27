import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { ListModuleComponent } from './list-module/list-module.component';
import { CKEditorModule } from 'ckeditor4-angular';

const routes: Routes = [
  {
    path :'', component:ListModuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),MaterialModule,FormsModule, ReactiveFormsModule,CKEditorModule],
  exports: [RouterModule, MaterialModule,FormsModule, ReactiveFormsModule, CKEditorModule]
})
export class ModuleRoutingModule { }
