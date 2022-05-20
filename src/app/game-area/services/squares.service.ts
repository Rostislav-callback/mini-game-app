import { Injectable } from '@angular/core';
import { map, repeat, takeWhile, timer, tap, BehaviorSubject, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SquaresService {
  count1: number = 0;
  count2: number = 0;
  dom!: any;
  event: any = null;

  playerScore$: BehaviorSubject<number> = new BehaviorSubject(0);
  computerScore$: BehaviorSubject<number> = new BehaviorSubject(0);
  
  constructor() {}

  createSquares() {
    const squares = [];

    for(let i = 0; i < 100; i++){
      squares.push(i);
    }

    return squares
  }

  gameTimer() {
    return timer(0, 1000).pipe(
      map((time: number) => {
        if (time == 0) {
          this.dom.style.background = 'yellow'
        } 
         
        if (time == 2 && this.event == null) {
          this.dom.style.background = 'red'
          this.computerScore$.next(this.computerCounter())
        }

        return 3 - time;
      }),
      tap((time) => {
        if(time == 1) {
          setTimeout(() => {
            this.dom.style.background = 'aqua';
            this.event = null;
          }, 500)
        }    
      }),
      takeWhile(Boolean, true),
      repeat(),
    )
  }

  changeSquare(dom: any) {
    console.log('take')
    const random = Math.floor(Math.random() * 100);
    const currentElement = dom[random].children[0].children[0];

    this.dom = currentElement;
  }

  clickSquare(dom: any, event: any) {
    dom.style.background = 'green';
    this.event = event;

    this.playerScore$.next(this.playerCounter());
  }

  playerCounter(): number {
    return ++this.count1;
  }

  computerCounter(): number {
    return ++this.count2;
  }
}
