import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';
import { AdminLayoutsComponent } from './shared/components/layouts/administrative-content/admin-layouts/admin-layouts.component';
import { ClientLayoutsComponent } from './shared/components/layouts/Client-content/client-layouts/client-layouts.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: '/auth', pathMatch: 'full' },

  {
    path: 'auth', component: AuthLayoutComponent,

    children: [
      {
        path: '', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },

  {
    path: "admin", component: AdminLayoutsComponent,

    children: [

      {
        path: 'users', loadChildren: () => import('./views/pages/users/users.module').then(m => m.UsersModule)
      },

      {
        path: 'profile', loadChildren: () => import('./views/pages/profile/profile.module').then(m => m.ProfileModule),
      },
      { path: 'modules', loadChildren: () => import('./views/pages/module/module.module').then(m => m.ModuleModule) }
      ,
      {
        path: 'role', loadChildren: () => import('./views/pages/roles/roles.module').then(m => m.RolesModule)
      },
      {
        path: 'licenses', loadChildren: () => import('./views/pages/license/license.module').then(m => m.LicenseModule)
      },
      {
        path: 'products', loadChildren: () => import('./views/pages/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'history', loadChildren: () => import('./views/pages/history/history.module').then(m => m.HistoryModule)
      }
    ]

  },
  { path: "user", component: ClientLayoutsComponent }

  , {
    "path": "error404",
    "component": Error404Component
  },
  {
    "path": "error500",
    "component": Error500Component
  },
  {
    "path": "**",
    "redirectTo": "error404",
    "pathMatch": "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
