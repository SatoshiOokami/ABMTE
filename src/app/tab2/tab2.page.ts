import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Anime } from '../anime';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { Search } from '../search';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [ApiService, AlertController, NavController]
})

export class Tab2Page {
  private searchResults: Search;
  private anime: Anime;
  private contentVisible: boolean;
  private showLoading: boolean;

  constructor(private ApiService: ApiService, private alertCtrl: AlertController, private navCtrl: NavController){}

  public passSelectedValue(category, id) {
    this.navCtrl.navigateForward('tabs/tab3?type=' + category + '&id=' + id);
  }
  /**
   * search
   */
  public search(selector, queryString) {
    if(queryString.length < 3)
    {
      this.createErrorAlert();
      return false;
    }
    this.showLoading = true;
    this.ApiService.search(selector, queryString).subscribe(
      (response) => {
        this.showLoading = false;
        this.contentVisible = true;
        this.searchResults = response;
        //console.log(this.searchResults);
        this.anime = this.searchResults.results[0];
        console.log(this.anime);
      }
    );
  }
  
  /**
  * createErrorAlert
  */
  private async createErrorAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Please include at least 3 letters in the search query.',
      buttons: ['OK']
    });

    alert.present();
  }
}
