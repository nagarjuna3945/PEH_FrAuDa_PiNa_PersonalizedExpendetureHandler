import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { SpendListComponent } from './components/spend/list/spend-list.component';
import { AggregateComponent } from './components/aggregate/aggregate.component';

// Auth
import { UserResolver } from './core/user.resolver';
import { AuthGuard } from './core/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: '../app/components/login/login.module#LoginModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'spend',
    loadChildren: '../app/components/spend/add/spend-add.module#SpendAddModule',
    resolve: { data: UserResolver}
  },
  {
    path: 'spend-list',
    component: SpendListComponent,
    resolve: { data: UserResolver}
  },
  {
    path: 'aggregate',
    component: AggregateComponent,
    resolve: { data: UserResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
