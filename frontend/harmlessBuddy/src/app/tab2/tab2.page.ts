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

  ngOnInit() {}
}
