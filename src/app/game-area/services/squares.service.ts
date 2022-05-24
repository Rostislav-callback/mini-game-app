import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SquaresService {
  private dom!: any;
  private renderer: Renderer2;

  event: any = null;
  nums: Array<number> = [];

  playerScore$: BehaviorSubject<string> = new BehaviorSubject('0');
  computerScore$: BehaviorSubject<string> = new BehaviorSubject('0');
  event$: BehaviorSubject<any> = new BehaviorSubject(null);
  
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createSquares() {
    const squares = [];

    for(let i = 0; i < 100; i++){
      squares.push(i);
    }

    return squares;
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

  changeSquareYellow() {
    this.renderer.addClass(this.dom, 'hit-square');
  }

  changeSquareDefault() {
    this.renderer.removeClass(this.dom, 'hit-square');
  }

  changeSquareRed() {
    this.renderer.addClass(this.dom, 'missed-square');
  }

  clickSquare(dom: any, event: any) {
    const oldValue = +this.playerScore$.getValue();
    this.changeSquareDefault();
    this.renderer.addClass(this.dom, 'active-square');
    this.event$.next(event);
    this.playerScore$.next(String(oldValue + 1));
  }

  resetGameArea() {
    const gameArea = this.dom.closest("div.game-area-block").childNodes;
    const squaresList = Array.from(gameArea);

    squaresList.pop();
    squaresList.forEach((element: any) => {
      const currentSquare = element.children[0].children[0];

      this.renderer.removeClass(currentSquare, 'missed-square');
      this.renderer.removeClass(currentSquare, 'active-square');
    });
  }
}
