import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from 'src/app/services/auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      service = TestBed.inject(AuthService);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should contain isLoggedIn property initialized to value `false`', () => {
      expect(service.isLoggedIn).not.toBeTrue();
    });

    it('should contain `login()` method', () => {
      expect(service.login).toBeTruthy();
    });

    it('should contain `login()` method that validates tour guide code with value `TG@2022`', () => {
      service.login(`TG@2022`);
      expect(service.isLoggedIn).toBeTrue();
    });

    it('should contain `logout()` method', () => {
      expect(service.logout).toBeTruthy();
    });

    it('should contain `logout()` method that resets `isLoggedIn` property to false', () => {
      service.isLoggedIn = true;
      service.logout();
      expect(service.isLoggedIn).not.toBeTrue();
    });
});  