import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('barChart', { static: false }) barChart;

  bars: any;
  colorArray: any;
  moodyMessages = [];
  reportNames = [];
  constructor(public api: ApiService) {
    this.getAllMoodyMessages();
  }

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {
    this.reportNames.forEach(elm => {
      let scores = [];
      let reportName = elm;

      this.moodyMessages.forEach(moodyMessage => {
        if (moodyMessage.report.name === reportName) {
          scores.push(moodyMessage.score);
        }
      });

      var sentimentData = (this.bars = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: ['10s', '20s', '30s', '40s', '50s', '60s', '70s', '80s'],
          datasets: [
            {
              label: elm,
              data: scores,
              backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
              borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      }));
    });
  }

  public getAllMoodyMessages() {
    return this.api.get('moody_messages').subscribe(
      moodyMessages => {
        console.log(moodyMessages);
        moodyMessages.forEach(moodyMessage => {
          this.moodyMessages.push(moodyMessage);
          if (this.reportNames.length === 0) {
            this.reportNames.push(moodyMessage.report.name);
          } else {
            let exist = false;
            this.reportNames.forEach(elm => {
              if (elm === moodyMessage.report.name) {
                exist = true;
              }
            });
            if (!exist) {
              this.reportNames.push(moodyMessage.report.name);
            }
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }
}
