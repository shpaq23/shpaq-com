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
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './account/account.component';
import { LogoutComponent } from './logout/logout.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';

@NgModule({
  declarations: [WipComponent, AuthorizationComponent, RegisterComponent,
    LoginComponent, ForgotPasswordComponent, ResetPasswordComponent,
    ActivateAccountComponent, RegisterFormComponent,
    NavbarComponent, AdminComponent, AccountComponent, LogoutComponent,
    AdminEditUserComponent],
  imports: [
    CommonModule,
    WipRoutingModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ],
  exports: [
    NavbarComponent
  ]
})
export class WipModule { }
