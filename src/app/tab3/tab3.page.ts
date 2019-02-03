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
  private profile: Anime;
  private showLoading: boolean;


  constructor(private plat: Platform, public ApiService: ApiService) {}

  ionViewDidEnter() {
    this.id = parseInt(this.plat.getQueryParam("id"));
    this.category = this.plat.getQueryParam("type");

    if(this.id != NaN && this.category != null) {
      this.showLoading = true;
      this.getField(this.category, this.id);
    }
  }
  
  /**
   * getField
   */
  public getField(type, id) {
    this.ApiService.getMALObject(type, id).subscribe(
      (response) => {
        this.showLoading = false;
        this.profile = response;
      }
    );
  }
}
