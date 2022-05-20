import { Injectable } from '@angular/core';
import { map, repeat, takeWhile, timer, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SquaresService {
  private dom!: any;
  private event: any = null;
  private nums: Array<number> = [];
  private interval: any;

  playerScore$: BehaviorSubject<string> = new BehaviorSubject('0');
  computerScore$: BehaviorSubject<string> = new BehaviorSubject('0');
  
  constructor() {}

  createSquares() {
    const squares = [];

    for(let i = 0; i < 100; i++){
      squares.push(i);
    }

    return squares;
  }

  gameTimer() {
    return timer(0, 1000).pipe(
      map((time: number) => {
        if (time == 0) {
          this.dom.classList.add('yellow');
        } 
         
        if (time == 2 && this.event == null) {
          const oldValue = +this.computerScore$.getValue();

          this.dom.classList.remove('yellow');
          this.dom.classList.add('red');
          this.computerScore$.next(String(oldValue + 1));
        }

        return 3 - time;
      }),
      tap((time) => {
        if(time == 1) {
          setTimeout(() => {
            this.event = null;
          }, 500)
        }    
      }),
      takeWhile(Boolean, true),
      repeat(),
    )
  }

  changeSquare(dom: any) {
    const random = Math.floor(Math.random() * 99) + 1;
    const repeatValue = this.nums.find(el => el === random);

    if(!repeatValue) {
      this.nums.push(random);
      const currentElement = dom[random].children[0].children[0];
      this.dom = currentElement;
    } else {
      this.changeSquare(dom);
    }
  }

  clickSquare(dom: any, event: any) {
    const oldValue = +this.playerScore$.getValue();
    dom.classList.add('green');
    this.event = event;
    this.playerScore$.next(String(oldValue + 1));
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

  resetGameArea() {
    const gameArea = document.getElementsByClassName('square');

    Array.from(gameArea).forEach(element => {
      element.classList.remove('red');
      element.classList.remove('green');
      element.classList.remove('yellow');
    });
  }
}
