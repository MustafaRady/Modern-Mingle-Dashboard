import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import {MatTableModule } from '@angular/material/table';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {AngularFireModule} from '@angular/fire/compat'
import {MatDialog, MatDialogModule} from '@angular/material/dialog'

import { AppComponent } from './app.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { UsersComponent } from './pages/users/users.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { TableComponent } from './component/table/table.component';
import { environment } from '../enviroments/environments';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { LoadingComponent } from './component/loading/loading.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AuthComponent } from './pages/auth/auth.component';
import { Auth2GuardComponent } from './auth2-guard/auth2-guard.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UsersComponent,
    ProductsComponent,
    TableComponent,
    AddProductComponent,
    LoadingComponent,
    EditProductComponent,
    DeleteProductComponent,
    ComingSoonComponent,
    AuthComponent,
    Auth2GuardComponent,
  ],

  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
