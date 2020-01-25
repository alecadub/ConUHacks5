import { Component } from '@angular/core';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  moodyMessages: any;

  constructor(public api: ApiService) {}

  ngOnInit() {
    // this.api
    //   .post('moody_messages', {
    //     message: 'test',
    //     mood: 'test',
    //     report: {
    //       name: 'holla'
    //     }
    //   })
    //   .subscribe(data => {
    //     console.log(data);
    //   });
    this.getAllMoodyMessages();
  }

  public getAllMoodyMessages() {
    return this.api.get('moody_messages').subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
