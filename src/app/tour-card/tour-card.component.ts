import { Component, Input, OnInit } from '@angular/core';
import { Tour } from '../models/tour';

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnInit {

  @Input()
  tour!: Tour
  constructor() { }

  ngOnInit(): void {
  }

}
