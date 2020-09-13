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
        path: 'mind-test',
        loadChildren: () => import('../mind-test/mind-test.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'question',
        loadChildren: () => import('../question/question.module').then( m => m.QuestionPageModule)
      },
      {
        path: '',
        redirectTo: '/patient/schedule',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/patient/schedule',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
