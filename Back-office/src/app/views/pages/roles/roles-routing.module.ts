import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRoleComponent } from './list-role/list-role.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [

  { path : '', component :ListRoleComponent}
];


@NgModule({
   imports: [RouterModule.forChild(routes),MaterialModule,FormsModule],
  exports: [RouterModule, MaterialModule,FormsModule]
})
export class RolesRoutingModule { }
