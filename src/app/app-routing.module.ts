import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'console',
    loadChildren: () =>
      import('./admin-console/console.module').then((m) => m.ConsoleModule),
  },
  {
    path: 'newsletter',
    loadChildren: () =>
      import('./feat-newsletter/newsletter.module').then((m) => m.NewsletterModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
