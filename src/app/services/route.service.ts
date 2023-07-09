import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private router: Router) { }

  navigateToHomeView() {
    this.router.navigate([""]);
  }
  navigateToTourRequestsView() {
    this.router.navigate(["tour-requests"]);
  }

  navigateToLoginView() {
    this.router.navigate(["login"]);
  }
}
