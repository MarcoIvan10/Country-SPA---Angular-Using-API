import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiURL: string = 'https://restcountries.com/v3.1'
  // https://restcountries.com/v3.1/name/{name}

  constructor(private http: HttpClient) { }

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
    return this.http.get<Country[]>(url)
      .pipe(
        // tap( countries => console.log('Tap 1', countries)),
        // map( countries => []),
        // tap( countries => console.log('Tap 2', countries)),
        catchError( () => of([])
        )
      );
  }

  searchByCountry( term: string ): Observable<Country[]> {
    const url = `${this.apiURL}/name/${term}`;
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of([]))
      );
  }

  searchByRegion( region: string ): Observable<Country[]> {
    const url = `${this.apiURL}/region/${region}`;
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of([]))
      );
  }
}
