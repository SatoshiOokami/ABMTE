import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Anime } from '../anime';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [ApiService, AlertController]
})

export class Tab2Page {
  public anime: Anime;

  constructor(public ApiService: ApiService, public alertCtrl: AlertController){}

  /**
   * search
   */
  public search(selector, queryString) {
    if(queryString.length < 3)
    {
      this.createErrorAlert();
      return false;
    }
    this.ApiService.search(selector, queryString).subscribe(
      (response) => {
        this.anime = response;
        console.log(this.anime);
      }
    );
  }
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
  
  private async createErrorAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Please include at least 3 letters in the search query.',
      buttons: ['OK']
    });

    alert.present();
  }
}
