import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login/login.component';
import {AuthenticationGuard} from './login/authentication.guard';
import {HierarchyTreeComponent} from './hierarchy-tree/hierarchy-tree.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: HierarchyTreeComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
