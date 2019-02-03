import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Anime } from '../anime';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [NavController, Platform, ApiService, NavController]
})
export class Tab3Page {
  private id: number;
  private category: string;
  private profile: Anime;
  private addOns: Anime;
  private showLoading: boolean;
  private additionalInfo: string;


  constructor(private plat: Platform, public ApiService: ApiService, private navCtrl: NavController, private storage: Storage) {}

  /**
   * gets querystring parameters and requests data for specific profile
   */
  ionViewDidEnter() {
    this.id = parseInt(this.plat.getQueryParam("id"));
    this.category = this.plat.getQueryParam("type");
    this.additionalInfo = "characters";

    if(this.id != NaN && this.category != null) {
      this.showLoading = true;
      this.getField(this.category, this.id);
      
      if(this.category == "anime") {
        this.additionalInfo += "_staff";
        this.getAdditionalInfo(this.category, this.id, this.additionalInfo);
      }

      if(this.category == "manga")
        this.getAdditionalInfo(this.category, this.id, this.additionalInfo);
    }
  }
  
  /**
   * gets data for specific profile
   * @param type 
   * @param id 
   */
  public getField(type, id) {
    this.ApiService.getMALObject(type, id).subscribe(
      (response) => {
        this.showLoading = false;
        this.profile = response;
        console.log(this.profile);
      }
    );
  }

  /**
   * gets additional info for profile
   * @param type 
   * @param id 
   * @param additionalInfo 
   */
  public getAdditionalInfo(type, id, additionalInfo) {
    this.ApiService.getAdditionalInfoForMALObject(type, id, additionalInfo).subscribe(
      (response) => {
        this.showLoading = false;
        this.addOns = response;
        console.log(this.addOns);
      }
    );
  }

  /**
   * shows character/seiyuu page
   * @param type 
   * @param id 
   */
  public redirectToNewPage(type, id) {
    this.navCtrl.navigateForward('tabs/tab3?type=' + type + '&id=' + id);
    this.id = id;
    this.category = type;
    this.getField(type, id);
  }

  /**
   * adds profile to favorites
   */
  public favorite() {
    
  }
}
