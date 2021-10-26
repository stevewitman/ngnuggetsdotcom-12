import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './core/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: {
      title: 'ngNuggets - Home',
      position: 1,
    },
  },
  {
    path: 'console',
    loadChildren: () =>
      import('./admin-console/console.module').then((m) => m.ConsoleModule),
  },
  {
    path: 'newsletter',
    loadChildren: () =>
      import('./feat-newsletter/newsletter.module').then(
        (m) => m.NewsletterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
