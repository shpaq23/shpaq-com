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

@NgModule({
  declarations: [WipComponent, AuthorizationComponent, RegisterComponent,
    LoginComponent, ForgotPasswordComponent, ResetPasswordComponent, ActivateAccountComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    WipRoutingModule,
    ReactiveFormsModule
  ]
})
export class WipModule { }
