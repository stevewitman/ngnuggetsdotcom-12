import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

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
  {
    path: 'submit',
    loadChildren: () =>
      import('./feat-submit/submit.module').then((m) => m.SubmitModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./feat-about/about.module').then((m) => m.AboutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
