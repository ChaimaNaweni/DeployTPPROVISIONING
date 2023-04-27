import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path:'', component: ListProductsComponent
  }
   ];

@NgModule({
  imports: [RouterModule.forChild(routes), CKEditorModule ,MaterialModule,FormsModule,ReactiveFormsModule],
  exports: [RouterModule,CKEditorModule ,MaterialModule,FormsModule,ReactiveFormsModule]
})
export class ProductsRoutingModule { }
