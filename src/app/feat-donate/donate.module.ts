import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonatePageComponent } from './donate-page/donate-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DonatePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DonatePageComponent },
    ]),
  ],
})
export class DonateModule {}
