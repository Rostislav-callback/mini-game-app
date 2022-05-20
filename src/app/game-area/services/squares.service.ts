import { Injectable } from '@angular/core';
import { map, repeat, takeWhile, timer, tap, BehaviorSubject, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SquaresService {
  private count1: number = 0;
  private count2: number = 0;
  private dom!: any;
  private event: any = null;
  private nums: Array<number> = [];

  playerScore$: BehaviorSubject<string> = new BehaviorSubject('0');
  computerScore$: BehaviorSubject<string> = new BehaviorSubject('0');
  
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
          this.computerScore$.next(String(this.computerCounter()))
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
    let noRepeatNum, oldArr;
    const random = Math.floor(Math.random() * 99) + 1;

    this.nums.push(random);

    oldArr = this.nums.slice(0, -1);
    oldArr.find(el => el === random)? 
      noRepeatNum = Math.floor(Math.random() * 99): 
      noRepeatNum = random;
    
    const currentElement = dom[noRepeatNum].children[0].children[0];

    this.dom = currentElement;
  }

  clickSquare(dom: any, event: any) {
    dom.style.background = 'green';
    this.event = event;

    this.playerScore$.next(String(this.playerCounter()));
  }

  playerCounter(): number {
    return ++this.count1;
  }

  computerCounter(): number {
    return ++this.count2;
  }

  endGame() {
    this.nums = [];
    this.playerScore$.next('0');
    this.computerScore$.next('0');
  }
}
