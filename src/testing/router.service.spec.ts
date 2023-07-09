import { RouterTestingModule } from "@angular/router/testing";
import { TestBed, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { RouteService } from 'src/app/services/route.service';
import { routes } from "src/app/app-routing.module";

describe('RouteService', () => {
    let service: RouteService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [AppComponent]
        });
        service = TestBed.inject(RouteService);
        router = TestBed.inject(Router);
        router.initialNavigation();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should contain `navigateToLoginView()` method which navigates to login view when called', fakeAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        router.navigateByUrl("login").then(() => {
            fixture.detectChanges();
            expect((fixture.nativeElement as HTMLElement).innerHTML).toContain("app-login");
        })
    }));
});  