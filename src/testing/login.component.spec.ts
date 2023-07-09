import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { AuthServiceStub } from './authServiceStub';
import { RouteService } from 'src/app/services/route.service';
import { RouteServiceStub } from './routeServiceStub';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
    let authService: AuthService;
    let routeService: RouteService;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, MatToolbarModule, MatInputModule, MatFormFieldModule, NoopAnimationsModule],
            declarations: [LoginComponent],
            providers: [
                { provide: AuthService, useClass: AuthServiceStub },
                { provide: RouteService, useClass: RouteServiceStub }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
        authService = TestBed.inject(AuthService);
        routeService = TestBed.inject(RouteService);
    });

    it('should create', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const component = fixture.componentInstance;

        expect(component).toBeTruthy();

    });

    it('should contain empty string property `tourGuideCode`', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const component = fixture.componentInstance;
        expect(component.tourGuideCode).toEqual("");
    });

    it('should contain `validateTourGuideCode()` method', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const component = fixture.componentInstance;
        expect(component.validateTourGuideCode).toBeTruthy();
    });

    it('should contain `validateTourGuideCode()` method that calls login() method of AuthService with tour guide code', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        fixture.detectChanges();
        let input = fixture.debugElement.query(By.css('input'));
        const spy = spyOn(authService, "login").withArgs("TG@2022").and.callThrough();
        let button = fixture.debugElement.query(By.css('button'));
        input.nativeElement.value = "TG@2022";
        input.triggerEventHandler("input", { target: input.nativeElement });
        fixture.detectChanges();

        button.triggerEventHandler("click", null);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledOnceWith("TG@2022");
        expect(fixture.componentInstance.tourGuideCode).toBe("TG@2022");
    });

    it('should contain `validateTourGuideCode()` method that calls navigateToTourRequestsView() method of RouteService for valid code', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        fixture.detectChanges();
        const spyAuth = spyOn(authService, "login").and.callThrough();
        const spyRoute = spyOn(routeService, "navigateToTourRequestsView").and.callThrough();
        let input = fixture.debugElement.query(By.css('input'));
        let button = fixture.debugElement.query(By.css('button'));
        input.nativeElement.value = "TG@2022";
        input.nativeElement.dispatchEvent(new Event("input"));
        fixture.detectChanges();

        button.triggerEventHandler("click", null);
        fixture.detectChanges();
        expect(spyRoute).toHaveBeenCalled();
    });

    it('should contain `validateTourGuideCode()` method that should not call navigateToTourRequestsView() method of RouteService for invalid code', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        fixture.detectChanges();
        const spyAuth = spyOn(authService, "login").and.callThrough();
        const spyRoute = spyOn(routeService, "navigateToTourRequestsView").and.callThrough();
        let input = fixture.debugElement.query(By.css('input'));
        let button = fixture.debugElement.query(By.css('button'));
        input.nativeElement.value = "TG@20222";
        input.nativeElement.dispatchEvent(new Event("input"));
        fixture.detectChanges();

        button.triggerEventHandler("click", null);
        fixture.detectChanges();
        expect(spyRoute).not.toHaveBeenCalled();
    });
});