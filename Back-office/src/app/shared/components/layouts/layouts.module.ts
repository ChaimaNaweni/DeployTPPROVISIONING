import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutsComponent } from './administrative-content/admin-layouts/admin-layouts.component';
import { ClientLayoutsComponent } from './Client-content/client-layouts/client-layouts.component';
import { NavbarComponent } from './administrative-content/navbar/navbar.component';
import { SidebarComponent } from './administrative-content/sidebar/sidebar.component';
import { FooterComponent } from './administrative-content/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { HeaderComponent } from 'src/app/layouts/header/header.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';


/***
 * 
 * @author Tarchoun Abir 
 * 
 */


@NgModule({
  declarations: [
    AdminLayoutsComponent,
    ClientLayoutsComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    SidebarComponent, 
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    AuthLayoutComponent,
    
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
 ,
	exports: [ 
    SidebarComponent, 
    NavbarComponent,
    FooterComponent,
    MaterialModule,
    HeaderComponent
    
	],
})
export class LayoutsModule { }
