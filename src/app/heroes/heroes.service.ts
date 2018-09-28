import {Injectable} from '@angular/core';
import HeroesInterface from './heroes.interface';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, debounce, debounceTime} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private heroesUrl = 'api/heroes';

  constructor(private http: HttpClient) {
  }

  /** GET heroes from the server */
  getHeroes(): Observable<HeroesInterface[]> {
    return this.http.get<HeroesInterface[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<HeroesInterface> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<HeroesInterface>(url).pipe(
      catchError(this.handleError<HeroesInterface>(`getHero id=${id}`))
    );
  }

  updateHero(hero: HeroesInterface): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      catchError(this.handleError<any>('updateHero'))
    );
  }

  deleteHero(hero: HeroesInterface): Observable<any> {
    const id = hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete(url, httpOptions).pipe(
      catchError(this.handleError('deleteHero'))
    );
  }

  addHero(hero: HeroesInterface): Observable<HeroesInterface> {
    return this.http.post<HeroesInterface>(this.heroesUrl, hero, httpOptions).pipe(
      catchError(this.handleError<HeroesInterface>('addHero'))
    );
  }

  searchHeroes(term: string): Observable<HeroesInterface[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<HeroesInterface[]>(`${this.heroesUrl}\?name=${term}`).pipe(
      catchError(this.handleError<HeroesInterface[]>('searchHeroes', []))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.statusText}`);

      // TODO: better job of transforming error for user consumption
      /*this.log(`${operation} failed: ${error.message}`);*/

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
