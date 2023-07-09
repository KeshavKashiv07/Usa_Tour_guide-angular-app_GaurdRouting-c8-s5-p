import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TourRequest } from '../models/tour-request';

@Injectable({
  providedIn: 'root'
})
export class TourRequestService {

  URL: string = "http://localhost:3000/tourRequests";
  constructor(private http: HttpClient) { }

  getAllTourReqeusts() : Observable<Array<TourRequest>> {
    return this.http.get<Array<TourRequest>>(`${this.URL}`);
  }

  saveTourRequest(tourRequest? : TourRequest) : Observable<TourRequest> {
    return this.http.post<TourRequest>(`${this.URL}`, tourRequest)
  }
}
