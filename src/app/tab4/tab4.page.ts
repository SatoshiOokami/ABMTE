import { Component } from '@angular/core';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  providers: [IonicStorageModule, NavController]
})
export class Tab4Page {

  constructor(private storage: Storage, private navCtrl: NavController) {}
  public favoriteItems: Array<any>;
  private anime: Array<any>;
  private manga: Array<any>;
  private characters: Array<any>;
  private persons: Array<any>;

  ionViewDidEnter() {
    this.storage.get("favoriteItems").then((data)=> {
      this.favoriteItems = data;
      console.log(data);

      this.anime = this.favoriteItems.filter((item) => {
        return item.category == "anime";
      });

      this.manga = this.favoriteItems.filter((item) => {
        return item.category == "manga";
      });
      
      this.characters = this.favoriteItems.filter((item) => {
        return item.category == "character";
      });
      
      this.persons = this.favoriteItems.filter((item) => {
        return item.category == "person";
      });
    });
  }
  
  public passSelectedValue(category, id) {
    this.navCtrl.navigateForward('tabs/tab3?type=' + category + '&id=' + id);
  }
}
