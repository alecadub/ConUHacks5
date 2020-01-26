import { Component } from '@angular/core';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public reports: any;

  constructor(public api: ApiService) {
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
}
