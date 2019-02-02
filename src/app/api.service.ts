import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Anime } from './anime';
import { Search } from './search';

const httpOptions = {
  headers: new HttpHeaders({'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json'})
};
const apiUrl = "https://api.jikan.moe/v3";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  public search(selector, queryString): Observable<Search> {
    const url = `${apiUrl}/search/${selector}/?q=${queryString}&page=1&limit=50`;
    return this.http.get<Search>(url).pipe(
      tap(_ => console.log(`fetched search q=${queryString}`)),
      catchError(this.handleError<Search>(`search id=${queryString}`))
    );
  }

  public getMALObject(type, id): Observable<Anime> {
    const url = `${apiUrl}/${type}/${id}`;
    return this.http.get<Anime>(url).pipe(
      tap(_ => console.log(`fetched ${type} id=${id}`)),
      catchError(this.handleError<Anime>(`getMALObject id=${id}`))
    );
  }
}
