import { Component, OnInit } from '@angular/core';
import { BehaviorSubject,  Observable, takeWhile, tap } from 'rxjs';

import { SquaresService } from './services/squares.service';

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.css']
})
export class GameAreaComponent implements OnInit {
  squares!: Array<any>;
  timer$!: Observable<number>;
  computerScore$!: BehaviorSubject<string>;
  playerScore$!: BehaviorSubject<string>;

  playerScore!: void;
  computerScore!: void;

  constructor(private squareService: SquaresService) { 
    this.computerScore$ = this.squareService.computerScore$;
    this.playerScore$ = this.squareService.playerScore$;
  }

  ngOnInit(): void {
    this.initValues();
  }

  initValues() {
    this.squares = this.squareService.createSquares();
    this.playerScore$.next('0');
    this.computerScore$.next('0');
  }

  startGame() {
    this.timer$ = this.squareService.gameTimer().pipe(
      takeWhile(() => {
        if (this.playerScore$.getValue() == '10' ||
            this.computerScore$.getValue() == '10'
        ) {
          this.squareService.endGame();

          return false;
        }

        return true;
      }),
    );
  }
}
