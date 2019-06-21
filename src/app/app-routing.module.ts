import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WipComponent} from './wip/wip/wip.component';
import {ProjectComponent} from './shpaq/project/project.component';
import {AuthorizationComponent} from './wip/authorization/authorization.component';
import {AuthGuard} from './api/guards/auth.guard';
import {WipGuard} from './api/guards/wip.guard';
import {LoginComponent} from './wip/login/login.component';
import {RegisterComponent} from './wip/register/register.component';
import {ForgotPasswordComponent} from './wip/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './wip/reset-password/reset-password.component';
import {ActivateAccountComponent} from './wip/activate-account/activate-account.component';
import {AdminComponent} from './wip/admin/admin.component';
import {UserResolver} from './api/resolvers/user-resolver';
import {UsersResolver} from './api/resolvers/users-resolver';
import {AccountComponent} from './wip/account/account.component';

const routes: Routes = [
  {path: '', component: ProjectComponent},
  {
    path: 'wip',
    component: WipComponent,
    canActivate: [AuthGuard, WipGuard],
    resolve: {user: UserResolver},
    children: [
      {path: 'account', component: AccountComponent},
      {path: 'admin', component: AdminComponent, resolve: {users: UsersResolver}},
    ]
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
    path: 'wip/forgotpassword',
    component: ForgotPasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wip/resetpassword',
    component: ResetPasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wip/activateaccount',
    component: ActivateAccountComponent,
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
