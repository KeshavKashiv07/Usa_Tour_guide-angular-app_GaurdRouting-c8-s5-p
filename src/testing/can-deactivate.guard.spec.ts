import { TestBed } from '@angular/core/testing';
import { CanDeactivateGuard } from 'src/app/services/can-deactivate.guard';

describe('AuthGuard', () => {

    let canDeactivateGuard: CanDeactivateGuard;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [],
            providers: [ ]
        });
        canDeactivateGuard = TestBed.inject(CanDeactivateGuard);
    });

    it('should create', () => {
        expect(canDeactivateGuard).toBeTruthy();
    });

});
