import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Anime } from './anime';

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

  public search(selector, queryString): Observable<Anime> {
    const url = `${apiUrl}/search/${selector}/?q=${queryString}&page=1`;
    return this.http.get<Anime>(url).pipe(
      tap(_ => console.log(`fetched search q=${queryString}`)),
      catchError(this.handleError<Anime>(`search id=${queryString}`))
    );
  }

  public getAnime(id): Observable<Anime> {
    const url = `${apiUrl}/anime/${id}`;
    return this.http.get<Anime>(url).pipe(
      tap(_ => console.log(`fetched anime id=${id}`)),
      catchError(this.handleError<Anime>(`getAnime id=${id}`))
    );
  }
}
