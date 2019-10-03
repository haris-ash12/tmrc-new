import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericContentService extends DataService {
  constructor(httpClient: HttpClient) {
    super('api/getContentsByUrl', httpClient);
  }
}
