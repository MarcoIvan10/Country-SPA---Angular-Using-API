import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, pipe } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiURL: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) {
    // console.log('CountriesServices init');
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of([])),
        // delay(2000),
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiURL}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null), // map
        catchError( () => of(null))
      );
  }

  searchByCapital( term: string ): Observable<Country[]> {
    const url = `${this.apiURL}/capital/${term}`;
    return this.getCountriesRequest(url);
  }

  searchByCountry( term: string ): Observable<Country[]> {
    const url = `${this.apiURL}/name/${term}`;
    return this.getCountriesRequest(url);
  }

  searchByRegion( region: string ): Observable<Country[]> {
    const url = `${this.apiURL}/region/${region}`;
    return this.getCountriesRequest(url);
  }
}
