import { Component, OnInit } from '@angular/core';
import { BehaviorSubject,  Observable, takeWhile } from 'rxjs';

import { SquaresService } from './services/squares.service';

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.css']
})
export class GameAreaComponent implements OnInit {
  squares!: Array<any>;
  timer$!: Observable<number>;
  computerScore$!: BehaviorSubject<number>;
  playerScore$!: BehaviorSubject<number>;

  constructor(private squareService: SquaresService) { 
    this.computerScore$ = this.squareService.computerScore$;
    this.playerScore$ = this.squareService.playerScore$;
  }

  ngOnInit(): void {
    this.createSquares();
  }

  createSquares() {
    this.squares = this.squareService.createSquares();
  }

  startGame() {
    this.timer$ = this.squareService.gameTimer().pipe(
      takeWhile(() => this.computerScore$.getValue() !== 10),
      takeWhile(() => this.playerScore$.getValue() !== 10)
    );
  }
}
