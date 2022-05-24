import { Injectable } from '@angular/core';
import { map, repeat, takeWhile, timer, tap, BehaviorSubject } from 'rxjs';
import { SquaresService } from './squares.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private interval: any;
  nums!: Array<number>;

  computerScore$!: BehaviorSubject<string>;
  playerScore$!: BehaviorSubject<string>;
  event$!: BehaviorSubject<any>;

  constructor(private squareService: SquaresService) {
    this.computerScore$ = this.squareService.computerScore$;
    this.playerScore$ = this.squareService.playerScore$;
    this.event$ = this.squareService.event$;
    this.nums = this.squareService.nums;
  }

  gameTimer() {
    return timer(0, 1000).pipe(
      map((time: number) => {
        if (time == 0) {
          this.squareService.changeSquareYellow();
        } 
             
        if (time == 2 && this.event$.getValue() == null) {
          const oldValue = +this.computerScore$.getValue();    
          this.squareService.changeSquareDefault();
          this.squareService.changeSquareRed();
          this.computerScore$.next(String(oldValue + 1));
        }
    
        return 3 - time;
      }),
      tap((time: number) => {
        if(time == 1) {
          setTimeout(() => {
            this.event$.next(null);
          }, 500);
        }    
      }),
      takeWhile(Boolean, true),
      repeat(),
    )
  }

  endGame() {
    this.nums = [];
    this.playerScore$.next('0');
    this.computerScore$.next('0');
  }
    
  setInterval(interval: any) {
    this.interval = interval;
  }
    
  endInterval() {
    clearInterval(this.interval);
  }
}