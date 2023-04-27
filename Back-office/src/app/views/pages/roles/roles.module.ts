import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { AddRoleComponent } from './add-role/add-role.component';
import { ListRoleComponent } from './list-role/list-role.component';


@NgModule({
  declarations: [
    AddRoleComponent,
    ListRoleComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
