import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';

// Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MessagingService } from './service/messaging.service';

// Auth
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { UserResolver } from './core/user.resolver';

// Service
import { SpendService } from './service/spend.service';
import { CategoryPipe } from './shared/category.pipe';
import { ComputeSumByCategoryPipe } from './shared/category.pipe';

// Component
import { AppComponent } from './app.component';
import { SpendListComponent } from './components/spend/list/spend-list.component';
import { SpendTableComponent } from './components/spend/list/common/spend-table/spend-table.component';
import { EditSpendComponent } from './components/spend/edit/edit-spend.component';
import { BottomSheetComponent } from './components/spend/list/bottom-sheet/bottom-sheet.component';
import { DeleteSpendDialogComponent } from './components/spend/list/bottom-sheet/dialog/delete-spend-dialog.component';
import { AlertMessageComponent } from './components/common/alert-message/alert-message.component';
import { AggregateComponent } from './components/aggregate/aggregate.component';
import { ShowCategoryComponent } from './components/aggregate/common/show-category/show-category.component';
import { SpendDialogByCategoryComponent } from './components/aggregate/common/spend-dialog-by-category/spend-dialog-by-category.component';

// Routing
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SpendListComponent,
    SpendTableComponent,
    EditSpendComponent,
    BottomSheetComponent,
    DeleteSpendDialogComponent,
    CategoryPipe,
    ComputeSumByCategoryPipe,
    AlertMessageComponent,
    AggregateComponent,
    ShowCategoryComponent,
    SpendDialogByCategoryComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,   // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    UserService,
    UserResolver,
    AuthGuard,
    SpendService,
    MessagingService,
    AlertMessageComponent,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  entryComponents: [
    EditSpendComponent,
    BottomSheetComponent,
    DeleteSpendDialogComponent,
    SpendDialogByCategoryComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
