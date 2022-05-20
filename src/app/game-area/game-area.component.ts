import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, takeWhile } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { SquaresService } from './services/squares.service';
import { ModalComponent } from '../modal/modal.component';

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

  isDisabled: boolean = false;
  playerScore!: void;
  computerScore!: void;

  constructor(
    private squareService: SquaresService,
    public dialog: MatDialog
  ) { 
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
    this.isDisabled = true;
    this.timer$ = this.squareService.gameTimer().pipe(
      takeWhile(() => {
        if (this.playerScore$.getValue() == '10' || this.computerScore$.getValue() == '10') {
          this.stopGame();

          return false;
        }

        return true;
      }),
    );
  }

  private stopGame() {
    this.squareService.endInterval();
    this.squareService.resetGameArea();
    this.dialog.open(ModalComponent, {
      width: '500px', 
      data: {
        playerScore: this.playerScore$.getValue(),
        computerScore: this.computerScore$.getValue()
      }
    });
    this.isDisabled = false;
  }
}
