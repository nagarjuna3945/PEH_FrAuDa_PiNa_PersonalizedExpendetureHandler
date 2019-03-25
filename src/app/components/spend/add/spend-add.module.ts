import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modules/material.module';
import { SpendAddRoutingModule  } from './spend-add-routing.module';
import { SpendComponent } from './spend.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SpendAddRoutingModule
  ],
  declarations: [
    SpendComponent
  ]
})
export class SpendAddModule { }
