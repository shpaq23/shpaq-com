import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WipComponent} from './wip/wip/wip.component';
import {ProjectComponent} from './shpaq/project/project.component';
import {AuthorizationComponent} from './wip/authorization/authorization.component';
import {AuthGuard} from './api/guards/auth.guard';
import {WipGuard} from './api/guards/wip.guard';
import {LoginComponent} from './wip/login/login.component';
import {RegisterComponent} from './wip/register/register.component';

const routes: Routes = [
  {path: '', component: ProjectComponent},
  {
    path: 'wip',
    component: WipComponent,
    canActivate: [AuthGuard, WipGuard]
  },
  {
    path: 'wip/login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wip/register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'authorization',
    component: AuthorizationComponent

  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
