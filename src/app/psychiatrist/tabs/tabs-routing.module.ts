import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'schedule',
        loadChildren: () => import('../schedule/schedule.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'patient',
        loadChildren: () => import('../patient/patient.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.Tab3PageModule)
        
      },
      {
        path: 'result',
        loadChildren: () => import('../result/result.module').then(m => m.ResultPageModule)
        
      },
      {
        path: 'appointment',
        loadChildren: () => import('../appointment/appointment.module').then( m => m.AppointmentPageModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('../signup/signup.module').then( m => m.SignupPageModule)
      },

      {
        path: '',
        redirectTo: '/psychiatrist/schedule',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/psychiatrist/schedule',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
