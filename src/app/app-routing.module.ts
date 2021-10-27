import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    data: {
      title: 'ngNuggets - Newsletter',
      position: 2,
    },
  },
  {
    path: 'submit',
    loadChildren: () =>
      import('./feat-submit/submit.module').then((m) => m.SubmitModule),
    data: {
      title: 'ngNuggets - Submit',
      position: 3,
    },
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./feat-about/about.module').then((m) => m.AboutModule),
    data: {
      title: 'ngNuggets - About',
      position: 4,
    },
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./feat-contact/contact.module').then((m) => m.ContactModule),
    data: {
      title: 'ngNuggets - Contact',
      position: 5,
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'top', // only works WITHOUT height: 100% on body,html
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
