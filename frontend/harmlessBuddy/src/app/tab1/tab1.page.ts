import { Component } from '@angular/core';
import { ApiService } from '../services/api';
import { Router } from '@angular/router';
import { CommunicationService } from '../services/communication.services';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public reports: any;

  constructor(
    public api: ApiService,
    public router: Router,
    public communicationService: CommunicationService
  ) {
    this.getAllReports();
  }

  public getAllReports() {
    return this.api.get('reports').subscribe(
      data => {
        this.reports = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  public navigateTo(event: any, report: any) {
    this.communicationService.lastReportNameConsulted = report.name;
    this.router.navigate(['/report-messages']);
  }
}
