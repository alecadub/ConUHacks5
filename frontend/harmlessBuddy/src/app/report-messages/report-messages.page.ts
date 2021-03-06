import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../services/communication.services';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-report-messages',
  templateUrl: './report-messages.page.html',
  styleUrls: ['./report-messages.page.scss']
})
export class ReportMessagesPage implements OnInit {
  public moodyMessages: any;
  public reportName: any;
  public counter = 0;
  constructor(
    public communicationService: CommunicationService,
    public api: ApiService
  ) {}

  ngOnInit() {
    this.getAllMoodyMessages();
  }

  public getAllMoodyMessages() {
    return this.api.get('moody_messages').subscribe(
      data => {
        this.moodyMessages = data;
        this.reportName = this.communicationService.lastReportNameConsulted;
        console.log(this.moodyMessages);
      },
      error => {
        console.log(error);
      }
    );
  }

  public getAuthor() {
    this.counter = this.counter + 1;
    if (this.counter % 2 === 0) {
      return 'Alec';
    } else {
      return 'Dave';
    }
  }
}
