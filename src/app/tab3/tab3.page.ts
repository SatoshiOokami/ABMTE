import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Anime } from '../anime';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [NavController, Platform, ApiService]
})
export class Tab3Page {
  private id: number;
  private category: string;
  private anime: Anime;


  constructor(private plat: Platform, public ApiService: ApiService) {
    this.id = parseInt(this.plat.getQueryParam("id"));
    this.category = this.plat.getQueryParam("type");

    switch (this.category) {
      case "anime":
        this.getAnime(this.id);
        break;

      case "manga":
        this.getAnime(this.id);
        break;

      case "character":
        this.getAnime(this.id);
        break;

      case "person":
        this.getAnime(this.id);
        break;
      default:
        break;
    }
  }
  
  /**
   * getAnime
   */
  public getAnime(id) {
    this.ApiService.getAnime(id).subscribe(
      (response) => {
        this.anime = response;
        console.log(this.anime);
      }
    );
  }
}
