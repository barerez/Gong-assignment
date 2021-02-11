import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import {HierarchyTreeComponent} from './hierarchy-tree/hierarchy-tree.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationGuard} from './login/authentication.guard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditNameComponent } from './edit-name/edit-name.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HierarchyTreeComponent,
    UserDetailsComponent,
    EditNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
