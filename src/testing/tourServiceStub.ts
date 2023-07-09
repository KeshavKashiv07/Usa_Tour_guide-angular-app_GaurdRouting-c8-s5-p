import { Observable, of } from "rxjs";
import { Tour } from "src/app/models/tour";

export class TourServiceStub {
    getTour(id?: string): Observable<Tour> {
        let tour: Tour={id:"2", tourName: "ABC", rating: 5};
        return of(tour);
    }
}