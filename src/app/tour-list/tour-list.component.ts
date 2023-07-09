import { Component, OnInit } from '@angular/core';
import { Tour } from '../models/tour';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {

  tours: Array<Tour> = [];

  constructor(private tourService: TourService) { }

  ngOnInit(): void {
    this.tourService.getAllTours().subscribe({
      next: data => {
        this.tours = data;
      },
      error: err => {
        alert(err);
      }
    });
  }

}
