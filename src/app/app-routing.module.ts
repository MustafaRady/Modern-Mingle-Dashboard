import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './pages/auth/auth.component';


const routes: Routes = [
  {path:'users',component:ComingSoonComponent,canActivate:[AuthGuard],data: { requiresLogin: true } },
  {path:'products',component:ProductsComponent,canActivate:[AuthGuard],data: { requiresLogin: true }},
  {path:'dashboard',component:ComingSoonComponent,canActivate:[AuthGuard],data: { requiresLogin: true }},
  {path:'inventory',component:ComingSoonComponent,canActivate:[AuthGuard],data: { requiresLogin: true }},
  {path:'orders',component:ComingSoonComponent,canActivate:[AuthGuard],data: { requiresLogin: true }},
  {path:'analytics',component:ComingSoonComponent,canActivate:[AuthGuard],data: { requiresLogin: true }},
  {path:'promotions',component:ComingSoonComponent,canActivate:[AuthGuard],data: { requiresLogin: true }},
  {path:'login',component:AuthComponent,canActivate:[AuthGuard],data: { requiresLogin: false }},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
