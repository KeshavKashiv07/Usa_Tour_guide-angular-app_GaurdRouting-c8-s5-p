import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { AuthServiceStub } from './authServiceStub';
import { RouteService } from 'src/app/services/route.service';
import { RouteServiceStub } from './routeServiceStub';

describe('AuthGuard', () => {

    let authGuard: AuthGuard;
    let authService: AuthService;
    let routeService: RouteService;
    const activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    const routerStateSnapshot: RouterStateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [],
            providers: [
                { provide: AuthService, useClass: AuthServiceStub },
                { provide: RouteService, useClass: RouteServiceStub }]
        });
        authGuard = TestBed.inject(AuthGuard);
        authService = TestBed.inject(AuthService);
        routeService = TestBed.inject(RouteService);
    });

    it('should create', () => {
        expect(authGuard).toBeTruthy();
    });

    it('should navigate to login view if user has not logged in', () => {
        const spy = spyOn(routeService, "navigateToLoginView")
        authService.isLoggedIn = false;
        const result = authGuard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        expect(spy).toHaveBeenCalled();
        expect(result).toBeFalse();
    });
    it('should return true if user has logged in', () => {
        const spy = spyOn(routeService, "navigateToLoginView")
        authService.isLoggedIn = true;
        const result = authGuard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        expect(spy).not.toHaveBeenCalled();
        expect(result).toBeTrue();
    });
});
