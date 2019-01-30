import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Anime } from '../anime';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [ApiService]
})

export class Tab2Page {
  public anime: Anime;

  constructor(public ApiService: ApiService){}

  /**
   * testFunc
   */
  public testFunc(selector, queryString, id) {
    console.log(selector);
    console.log(queryString);
    this.ApiService.getAnime(id).subscribe(
      (response) => {
        this.anime = response;
        console.log(this.anime);
      }
    );
  }
}
