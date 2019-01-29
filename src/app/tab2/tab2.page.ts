import { Component } from '@angular/core';
import { ApiService } from '../api-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  /**
   * testFunc
   */
  public testFunc() {
    console.log("Hello");
  }
}
