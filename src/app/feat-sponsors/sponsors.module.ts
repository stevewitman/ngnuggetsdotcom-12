import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorsPageComponent } from './sponsors-page/sponsors-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SponsorsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SponsorsPageComponent },
    ]),
  ],
})
export class SponsorsModule {}
