import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContactPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ContactPageComponent },
    ]),
  ],
})
export class ContactModule {}
