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
  {
    path: 'settings',
    loadChildren: () =>
      import('./feat-settings/settings.module').then((m) => m.SettingsModule),
    data: {
      title: 'ngNuggets - Settings',
      position: 6,
    },
  },
  {
    path: 'sponsors',
    loadChildren: () =>
      import('./feat-sponsors/sponsors.module').then((m) => m.SponsorsModule),
    data: {
      title: 'ngNuggets - Sponsors',
      position: 7,
    },
  },
  {
    path: 'donate',
    loadChildren: () =>
      import('./feat-donate/donate.module').then((m) => m.DonateModule),
    data: {
      title: 'ngNuggets - Donate',
      position: 8,
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
