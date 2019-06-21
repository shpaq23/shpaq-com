import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WipRoutingModule } from './wip-routing.module';
import { WipComponent } from './wip/wip.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import {NavbarComponent} from '../navbar/navbar.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [WipComponent, AuthorizationComponent, RegisterComponent,
    LoginComponent, ForgotPasswordComponent, ResetPasswordComponent,
    ActivateAccountComponent, RegisterFormComponent, NavbarComponent,
    UserComponent, AdminComponent, AccountComponent],
  imports: [
    CommonModule,
    WipRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class WipModule { }
