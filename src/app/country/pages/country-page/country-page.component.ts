import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-country-page',
    imports: [ReactiveFormsModule, JsonPipe],
    templateUrl: './country-page.component.html'
})
export class CountryPageComponent { 

    fb = inject(FormBuilder);

    countryService = inject(CountryService);

    regions = signal(this.countryService.Regions);
    countriesByRegion = signal<Country[]>([]);
    borders = signal<Country[]>([]);


    myForm = this.fb.group({
        region: ['',Validators.required],
        country: ['', Validators.required],
        border: ['', Validators.required]
    });

    onFormChanged = effect((onCleanUp) => {
        const formRegionChanged = this.onRegionChanged();
        const formCountryChanged = this.onCountryChanged();

        onCleanUp(() => {
            formRegionChanged.unsubscribe();
            formCountryChanged.unsubscribe();
        });
    });

    onRegionChanged() {
        return this.myForm.get('region')!.valueChanges.pipe(
            tap(() => this.myForm.get('country')!.setValue('')),
            tap(() => this.myForm.get('border')!.setValue('')),
            tap(() => {
                this.borders.set([]);
                this.countriesByRegion.set([]);
            }),
            switchMap((region) => this.countryService.getCountriesByRegion(region ?? ''))

        ).subscribe((countries) => {
            this.countriesByRegion.set(countries);
        })
    }

    onCountryChanged() {
        return this.myForm.get('country')!.valueChanges.pipe(
            tap(() => this.myForm.get('border')!.setValue('')),
            filter((value) => value!.length > 0),
            switchMap((alphaCode) => 
                this.countryService.getCountryByAlphaCode(alphaCode ?? '')
            ),
            switchMap((country) =>  this.countryService.getCountryNameByCodeArray(country.borders))
        )
        
        
        .subscribe((borders) => {
            this.borders.set(borders);
        })
    }
}
