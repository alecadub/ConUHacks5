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
  constructor(public api: ApiService) {}

  ngOnInit() {}

  public voiceSearch() {
    if ('webkitSpeechRecognition' in window) {
      const vSearch = new webkitSpeechRecognition();
      console.log(vSearch);
      vSearch.continuous = false;
      vSearch.interimresults = false;
      vSearch.lang = 'en-US';
      vSearch.start();
      const voiceHandler = this.hiddenSearchHandler.nativeElement;
      vSearch.onresult = function(data) {
        voiceHandler.value = data.results[0][0].transcript;
        console.log(data.results[0][0].transcript);
        vSearch.stop();
      };
      vSearch.onerror = function(e) {
        console.log(e);
      };
    }
  }
}
