import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WipRoutingModule } from './wip-routing.module';
import { WipComponent } from './wip/wip.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [WipComponent, AuthorizationComponent, RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    WipRoutingModule,
    ReactiveFormsModule
  ]
})
export class WipModule { }
