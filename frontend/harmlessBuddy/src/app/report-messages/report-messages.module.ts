import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportMessagesPageRoutingModule } from './report-messages-routing.module';

import { ReportMessagesPage } from './report-messages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportMessagesPageRoutingModule
  ],
  declarations: [ReportMessagesPage]
})
export class ReportMessagesPageModule {}
