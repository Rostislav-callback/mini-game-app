import { Component, Input, OnInit } from '@angular/core';
import { SquaresService } from '../game-area/services/squares.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  @Input('id') idProps!: number;

  constructor(private squareService: SquaresService) { }

  ngOnInit(): void { }

  onClick(event: any) {
    if (event.target.classList.contains('yellow')) {
      this.squareService.clickSquare(event.target, event);
    }
  }
}
