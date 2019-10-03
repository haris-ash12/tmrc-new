import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BlogBySlugService extends DataService {
  constructor(httpClient: HttpClient) {
    super('api/getblogsbyslug', httpClient);
  }
}
