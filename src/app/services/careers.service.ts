import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CareersService extends DataService {
  constructor(httpClient: HttpClient) {
    super('api/getjobsrepository', httpClient);
  }
}
