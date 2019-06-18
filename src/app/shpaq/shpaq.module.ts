import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShpaqRoutingModule } from './shpaq-routing.module';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [ProjectComponent],
  exports: [],
  imports: [
    CommonModule,
    ShpaqRoutingModule
  ]
})
export class ShpaqModule { }
