import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [

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
        path: '',
        redirectTo: '/psychiatrist/profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/psychiatrist/profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
