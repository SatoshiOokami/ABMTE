import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { Search } from '../search';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [ApiService, AlertController, NavController, HTTP]
})

export class Tab2Page {
  private searchResults: Search;
  public contentVisible: boolean;
  public showLoading: boolean;

  constructor(private ApiService: ApiService, private alertCtrl: AlertController, private navCtrl: NavController){}

  /**
   * redirects to a profile page
   * @param category 
   * @param id 
   */
  public passSelectedValue(category, id) {
    this.navCtrl.navigateForward('tabs/tab3?type=' + category + '&id=' + id);
  }
  
  /**
   * gets search results
   * @param selector 
   * @param queryString 
   */
  public search(selector, queryString) {
    if(queryString.length < 3)
    {
      this.createErrorAlert();
      return false;
    }
    this.showLoading = true;
    this.ApiService.search(selector, queryString).then(
      (data) => {
        this.showLoading = false;
        this.contentVisible = true;
        this.searchResults = data;
      }
    );
  }
  
  /**
  * creates error alert
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
