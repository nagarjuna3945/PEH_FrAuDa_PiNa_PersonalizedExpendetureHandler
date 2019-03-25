import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpendComponent } from './spend.component';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

const routes: Routes = [
  { path: '', component: SpendComponent },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class SpendAddRoutingModule { }
