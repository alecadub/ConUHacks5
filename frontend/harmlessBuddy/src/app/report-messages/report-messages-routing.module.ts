import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportMessagesPage } from './report-messages.page';

const routes: Routes = [
  {
    path: '',
    component: ReportMessagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportMessagesPageRoutingModule {}
