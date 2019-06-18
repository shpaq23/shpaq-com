import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WipRoutingModule } from './wip-routing.module';
import { WipComponent } from './wip/wip.component';
import { AuthorizationComponent } from './authorization/authorization.component';

@NgModule({
  declarations: [WipComponent, AuthorizationComponent],
  imports: [
    CommonModule,
    WipRoutingModule
  ]
})
export class WipModule { }
