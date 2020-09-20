import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./patient/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'psychiatrist',
    loadChildren: () => import('./psychiatrist/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'psychiatrist',
    loadChildren: () => import('./patient/psychiatrist/psychiatrist.module').then( m => m.PsychiatristPageModule)
  },
  {
    path: 'psychiatrist/patient/:id',
    loadChildren: () => import('./psychiatrist/result/result.module').then( m => m.ResultPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
