import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn: boolean = false;

  login(tourGuideCode: string) {
    this.isLoggedIn = tourGuideCode === "TG@2022";
  }

  logout() {
    this.isLoggedIn = false;
  }
}
