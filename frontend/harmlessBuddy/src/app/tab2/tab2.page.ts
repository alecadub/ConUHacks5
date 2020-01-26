import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../services/api';
declare var webkitSpeechRecognition: any;
declare var require: any;
var random_name = require('node-random-name');
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('gSearch', { static: false }) formSearch;
  @ViewChild('searchKey', { static: false }) hiddenSearchHandler;
  public speechToText;
  public vSearch: any;
  public reportName: any;
  public lastMessage: any;
  constructor(public api: ApiService) {}

  ngOnInit() {
    this.reportName = random_name();
  }

  public voiceSearch() {
    if ('webkitSpeechRecognition' in window) {
      this.vSearch = new webkitSpeechRecognition();
      this.vSearch.continuous = false;
      this.vSearch.interimresults = false;
      this.vSearch.lang = 'en-US';
      this.vSearch.start();
      const voiceHandler = this.hiddenSearchHandler.nativeElement;
      this.vSearch.onresult = data => {
        voiceHandler.value = data.results[0][0].transcript;
        this.speechToText = data.results[0][0].transcript;
      };
      this.vSearch.onerror = e => {
        console.log(e);
      };
      this.vSearch.onend = () => {
        this.voiceStop();
        this.vSearch.start();
      };
    }
  }

  public sendData() {
    console.log('last: ' + this.lastMessage);
    if (this.lastMessage !== this.speechToText) {
      console.log('new: ' + this.speechToText);
      setTimeout(() => {
        this.api
          .post('moody_messages', {
            message: this.speechToText,
            mood: 'mock',
            report: {
              name: this.reportName
            }
          })
          .subscribe(data => {});
      }, 5000);
      this.lastMessage = this.speechToText;
    }
  }

  public voiceStop() {
    this.sendData();
    this.vSearch.stop();
  }
}
