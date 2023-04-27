import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { ListLicenseComponent } from './list-license/list-license.component';

const routes: Routes = [
  {
    path: '', component:ListLicenseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), MaterialModule, FormsModule],
  exports: [RouterModule, MaterialModule,FormsModule]
})
export class LicenseRoutingModule { }
