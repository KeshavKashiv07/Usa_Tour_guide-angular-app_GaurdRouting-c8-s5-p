import { Location } from '@angular/common';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { CanDeactivateGuard } from 'src/app/services/can-deactivate.guard';
import { CanDeactivateStub } from './canDeactivateStub';
import { RouteService } from 'src/app/services/route.service';
import { RouteServiceStub } from './routeServiceStub';
import { TourRequestService } from 'src/app/services/tour-request.service';
import { TourService } from 'src/app/services/tour.service';
import { TourRequestServiceStub } from './tourRequestServiceStub';
import { TourServiceStub } from './tourServiceStub';
import { TourCartComponent } from 'src/app/tour-cart/tour-cart.component';


describe('TourCartComponent', () => {

    let router: Router;
    let location: Location;
    let tourService: TourService;
    let canDeactivate: CanDeactivateGuard;
    let tourRequestService: TourRequestService;
    let routeService: RouteService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes),
                MatSnackBarModule,
                MatToolbarModule,
                FormsModule,
                MatFormFieldModule,
                MatInputModule,
                NoopAnimationsModule,
                MatIconModule,
                MatDatepickerModule,
                MatNativeDateModule
            ],
            declarations: [TourCartComponent],
            providers: [
                { provide: TourRequestService, useClass: TourRequestServiceStub },
                { provide: TourService, useClass: TourServiceStub },
                {
                    provide: ActivatedRoute, useValue: {
                        paramMap: of({ get: (id: any) => id })
                    }
                },
                { provide: RouteService, useClass: RouteServiceStub },
                { provide: CanDeactivateGuard, useClass: CanDeactivateStub}
            ]
        }).compileComponents();

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        tourService = TestBed.inject(TourService);
        tourRequestService = TestBed.inject(TourRequestService);
        routeService = TestBed.inject(RouteService);
        canDeactivate = TestBed.inject(CanDeactivateGuard);
        router.initialNavigation();
    });

    it('should create', () => {
        const fixture = TestBed.createComponent(TourCartComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();

    });

    it('should contain `submitStatus` property initialized to false', () => {
        const fixture = TestBed.createComponent(TourCartComponent);
        const component = fixture.componentInstance;
        expect(component.submitStatus).toBeFalse();
    });

    it('should contain method `canDeactivate()`', () => {
        const fixture = TestBed.createComponent(TourCartComponent);
        const component = fixture.componentInstance;
        expect(component.canDeactivate).toBeTruthy();
    });

    it('should call JavaScript function confirm when canDeactivate() is called with `submitStatus` set to false', () => {
        const fixture = TestBed.createComponent(TourCartComponent);
        const component = fixture.componentInstance;
        const confirmSpy = spyOn(window, "confirm")
        fixture.detectChanges();
        component.canDeactivate();
        expect(confirmSpy).toHaveBeenCalled();
    });
    it('should set `submitStatus` to true when JavaScript function `confirm()` returns true', () => {
        const fixture = TestBed.createComponent(TourCartComponent);
        const component = fixture.componentInstance;
        const confirmSpy = spyOn(window, "confirm").and.returnValue(true);
        fixture.detectChanges();
        component.canDeactivate();
        expect(component.submitStatus).toBeTrue();
    });

    it('should not call JavaScript function confirm when canDeactivate() is called with `submitStatus` set to true', () => {
        const fixture = TestBed.createComponent(TourCartComponent);
        const component = fixture.componentInstance;
        const confirmSpy = spyOn(window, "confirm");
        fixture.detectChanges();
        component.submitStatus = true;
        component.canDeactivate();
        expect(confirmSpy).not.toHaveBeenCalled();
    });

    it('should fetch tour details for the `id` provided in the route with `submitStatus` set to `false`', fakeAsync(() => {
        const fixture = TestBed.createComponent(TourCartComponent);
        const component = fixture.componentInstance;
        const tourSpy = spyOn(tourService, "getTour").and.callThrough();
        fixture.detectChanges();

        router.navigateByUrl("/tour-cart/2").then(() => {
            component.ngOnInit();
            expect(component.submitStatus).toBeFalse();
            flush();
        });
    }));

    it('should set the `submitStatus` to `true` after tour request is made', fakeAsync(() => {
        const fixture = TestBed.createComponent(TourCartComponent);
        fixture.detectChanges();
        tick();

        const tourRequestServiceSpy = spyOn(tourRequestService, "saveTourRequest").and.callThrough();
        const routerServiceSpy = spyOn(routeService, "navigateToHomeView").and.callThrough();

        const dateInputElement = fixture.debugElement.query(By.css('input[name="dateOfTravel"]'));//.nativeElement;// as HTMLInputElement;
        dateInputElement.nativeElement.value = "2008-02-04";
        dateInputElement.nativeElement.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        tick();
        
        const customerNameInputElement = fixture.debugElement.query(By.css('input[name="customerName"]'));//.nativeElement;// as HTMLInputElement;
        customerNameInputElement.nativeElement.value = "Sam Anderson";
        customerNameInputElement.nativeElement.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        tick();

        const customerEmailInputElement = fixture.debugElement.query(By.css('input[name="customerEmail"]')).nativeElement;// as HTMLInputElement;
        customerEmailInputElement.value = "sam.anderson@gmail.com";
        customerEmailInputElement.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        tick();

        const customerPhoneInputElement = fixture.debugElement.query(By.css('input[name="customerPhone"]')).nativeElement;// as HTMLInputElement;
        customerPhoneInputElement.value = "+12653490234";
        customerPhoneInputElement.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        tick();

        const button = fixture.debugElement.queryAll(By.css("button"))[0];
        button.triggerEventHandler("click", null);
        fixture.detectChanges();
        tick();
        expect(tourRequestServiceSpy).toHaveBeenCalled();//OnceWith(fixture.componentInstance.tourRequest);
        expect(fixture.componentInstance.submitStatus).toBeTrue();
        expect(routerServiceSpy).toHaveBeenCalled();
        flush();
    }));

    it('should set the `submitStatus` to `true` after tour request is made', fakeAsync(() => {

        const fixture = TestBed.createComponent(TourCartComponent);

        const tourRequestServiceSpy = spyOn(tourRequestService, "saveTourRequest").and.callThrough();
        const routerServiceSpy = spyOn(routeService, "navigateToHomeView").and.callThrough();
        router.navigateByUrl("tour-cart/2").then(() => {
            fixture.detectChanges();
            tick();
            router.navigateByUrl("").then(() => {
                expect(tourRequestServiceSpy).not.toHaveBeenCalledOnceWith(fixture.componentInstance.tourRequest);
                expect(fixture.componentInstance.submitStatus).toBeFalse();
                expect(routerServiceSpy).not.toHaveBeenCalled();
                expect(location.path()).toContain("/tour-cart");
                flush();
            });
        });
    }));
});