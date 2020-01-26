import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../services/api';
declare var webkitSpeechRecognition: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('gSearch', { static: false }) formSearch;
  @ViewChild('searchKey', { static: false }) hiddenSearchHandler;
  public speechToText = '';
  public vSearch: any;
  constructor(public api: ApiService) {}

  ngOnInit() {}

  public voiceSearch() {
    if ('webkitSpeechRecognition' in window) {
      this.vSearch = new webkitSpeechRecognition();
      this.vSearch.continuous = false;
      this.vSearch.interimresults = false;
      this.vSearch.lang = 'en-US';
      this.vSearch.start();
      const voiceHandler = this.hiddenSearchHandler.nativeElement;
      this.vSearch.onresult = function(data) {
        voiceHandler.value = data.results[0][0].transcript;
        this.speechToText =
          this.speechToText + data.results[0][0].transcript + '.';
      };
      this.vSearch.onerror = function(e) {
        console.log(e);
      };
    }
  }

  public voiceStop() {
    this.vSearch.stop();
    this.api.post('reports', {
      message: this.speechToText,
      report: {
        name: 'Meeting' + new Date()
      }
    });
  }
}
