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
    loadChildren: () => import('./psychiatrist/signup/signup.module').then( m => m.SignupPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
