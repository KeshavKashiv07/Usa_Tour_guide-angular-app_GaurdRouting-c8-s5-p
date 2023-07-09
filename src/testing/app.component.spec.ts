import { Location } from '@angular/common';
import { flush, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { AuthGuardStub } from './authGuardStub';

describe('AppComponent', () => {

    let authGuard: AuthGuard;
    let router: Router;
    let location: Location;
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [AppComponent],
            providers: [
                { provide: AuthGuard, useClass: AuthGuardStub }
            ]
        }).compileComponents();

        router = TestBed.inject(Router);
        authGuard = TestBed.inject(AuthGuard);
        location = TestBed.inject(Location);
    });

    it('should create', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should navigate to login view if request is made to `tour-request` view by anonymous user', fakeAsync(() => {
        const authGuardSpy = spyOn(authGuard, "canActivate").and.callThrough();
        router.navigateByUrl("/tour-requests").then(() => {
            tick();
            expect(authGuardSpy).toHaveBeenCalled();
            flush();
        });
    }));
});