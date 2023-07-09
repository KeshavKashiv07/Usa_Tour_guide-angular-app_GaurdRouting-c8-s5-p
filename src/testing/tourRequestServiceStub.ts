import { Observable, of } from "rxjs";
import { TourRequest } from "src/app/models/tour-request";

export class TourRequestServiceStub {
    saveTourRequest(tourRequest: TourRequest) : Observable<TourRequest>{
        return of<TourRequest>(tourRequest);
    }
}