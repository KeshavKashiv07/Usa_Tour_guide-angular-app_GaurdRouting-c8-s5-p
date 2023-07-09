import { routes } from 'src/app/app-routing.module';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { CanDeactivateGuard } from 'src/app/services/can-deactivate.guard';
import { TourCartComponent } from 'src/app/tour-cart/tour-cart.component';
import { TourRequestsComponent } from 'src/app/tour-requests/tour-requests.component';

describe('AppRoutingModule', () => {
    it('should contain route definition for login component', ()=> {
        expect(routes).toContain({path: "login", component: LoginComponent});
    });
    it('should protect route to tour-requests view', () => {
        expect(routes).toContain({path: "tour-requests", component: TourRequestsComponent, canActivate: [AuthGuard]});
    });
    it('should prevent navigation away from tour-cart view with unsaved changes', () => {
        expect(routes).toContain({path: "tour-cart/:id", component: TourCartComponent, canDeactivate: [CanDeactivateGuard]});

    });
});