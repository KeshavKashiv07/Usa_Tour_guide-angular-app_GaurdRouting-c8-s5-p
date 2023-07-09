import { convertToParamMap } from "@angular/router";
import { of } from "rxjs";

export class ActivatedRouteStub {
    paramMap = of(convertToParamMap({
        id: 2
    }))
}