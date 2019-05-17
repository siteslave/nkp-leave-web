import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerGuardService } from '../shared/manager-guard.service';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    canActivate: [ManagerGuardService],
    children: [
      {path: 'main', component: MainComponent},
      {path: 'profile', component: ProfileComponent},
      {path: '', redirectTo: 'main', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
