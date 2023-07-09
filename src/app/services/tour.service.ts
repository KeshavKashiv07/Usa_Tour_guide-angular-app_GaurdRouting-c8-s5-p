import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from '../models/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  URL: string = "http://localhost:3000/tours";
  constructor(private http: HttpClient) { }

  getAllTours(): Observable<Array<Tour>> {
    return this.http.get<Array<Tour>>(this.URL)
  }

  getTour(id?: string) : Observable<Tour>{
    console.log(id);
    return this.http.get<Tour>(`${this.URL}/${id}`);
  }
}
