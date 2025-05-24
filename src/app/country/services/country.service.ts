import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly baseUrl: string = "https://restcountries.com/v3.1";
  private http = inject(HttpClient);

  private _regions = ['Africa','Americas','Asia', 'Oceania', 'Europe'];

  get Regions(): string[]{
    return [...this._regions]
  }

  getCountriesByRegion(region:string): Observable<Country[]>{
    if(!region) return of([]);

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url)
  }

  getCountryByAlphaCode(code:string) : Observable<Country>{
    const url = `${this.baseUrl}/alpha/${code}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }


  getCountryNameByCodeArray(countryCodes:string[]) : Observable<Country[]>{
    if(!countryCodes || countryCodes.length == 0) return of([])
    const countriesRequest: Observable<Country>[] = [];

    countryCodes.forEach( (code) => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequest.push(request);
    })
    return combineLatest(countriesRequest);
  } 
}

