import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Anime } from './anime';
import { Search } from './search';
import { AlertController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';

const httpOptions = {
  headers: new HttpHeaders({'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json'})
};
const apiUrl = "https://api.jikan.moe/v3";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  public searchResults: Search;

  constructor(private http: HttpClient, private alertCtrl: AlertController, private httpNat: HTTP) { }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.createErrorAlert(error);
      return of(result as T);
    };
  }

  private async createErrorAlert(err) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: err.message,
      buttons: ['OK']
    });

    alert.present();
  }

  public search(selector, queryString): Promise<Search> {
    const url = `${apiUrl}/search/${selector}/?q=${queryString}&page=1&limit=50`;
    return this.httpNat.get(url, {}, {}).then((data) => {
      var json = JSON.parse(data.data);
      this.searchResults = json;
      return this.searchResults;
    });
  }

  public getMALObject(type, id): Observable<Anime> {
    const url = `${apiUrl}/${type}/${id}`;
    return this.http.get<Anime>(url).pipe(
      tap(_ => console.log(`fetched ${type} id=${id}`)),
      catchError(this.handleError<Anime>(`getMALObject id=${id}`))
    );
  }

  public getAdditionalInfoForMALObject(type, id, additionalInfo): Observable<Anime>{
    const url = `${apiUrl}/${type}/${id}/${additionalInfo}`;
    return this.http.get<Anime>(url).pipe(
      tap(_ => console.log(`fetched ${type} id=${id} with additional info`)),
      catchError(this.handleError<Anime>(`getMALObject id=${id}`))
    );
  }
}
