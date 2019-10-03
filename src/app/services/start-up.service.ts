import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StartUpService {
  private countryCode: string;

  constructor(private httpClient: HttpClient) {
    // console.log('Start up service constructor...');
  }

  startupCall() {
    return new Promise((resolve, reject) => {
      // console.log('Startup service called...');

      // * commenting this code below, so can work quickly
      // * Hardcoded the value. And sending pk in resolve.
      // * Its fast!!!

      // * start....
      // this.httpClient
      //   .get('https://jsonip.com/')
      //   .toPromise()
      //   .then((jsonIp: any) => {
      //     console.log(jsonIp);
      //     this.httpClient
      //       .get('http://webapp.tmrc.ga/api/findLocation?ip=' + jsonIp.ip)
      //       .toPromise()
      //       .then((code: string) => {
      //         console.log('code: ' + code);
      //         this.countryCode = code;

      //         // Set country code in the local storage.
      //         localStorage.setItem('countryCode', this.countryCode);

      //         resolve(this.countryCode);
      //       });
      //   });

      // * end....

      localStorage.setItem('countryCode', 'pk');
      resolve('pk');
    });
  }
  get getCountryCode() {
    //
    // let value = this.countryCode;
    // console.log('value is askldfjladsj....');
    // console.log('awaited value...' + value);
    // if (this.countryCode) {
    //   console.log(this.countryCode);
    //   return this.countryCode;
    // }

    return localStorage.getItem('countryCode');
  }
}

// Hamary pass country code (pk) as a response a rha.
// Jab response atta tw ham ussay localstorage ma save kar dety. TOken bna kar.
// Phr jab check karna tw us kay liay aik method bna letay.
