import { Component } from '@angular/core';
import { Storage, IonicStorageModule } from '@ionic/storage';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  providers: [IonicStorageModule]
})
export class Tab4Page {

  constructor(private storage: Storage) { }
  private favoriteFields: Array<any>;

  ionViewDidEnter() {
    this.storage.get("favoriteItems").then((data)=> {
      this.favoriteFields = data;
      console.log(data);
    });
  }
}
