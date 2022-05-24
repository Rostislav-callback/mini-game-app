import { Directive, ElementRef, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from '../services/game.service';
import { SquaresService } from '../services/squares.service';

@Directive({
  selector: '[appSquare]'
})
export class SquareDirective {
  elementList: any = this.elementRef.nativeElement.childNodes;
  timer$!: Observable<number>;

  constructor(private elementRef: ElementRef,
    private gameService: GameService,
    private squareService: SquaresService) {}

  @HostListener('document:click', ['$event']) onClick(event: Event) {
    if (event.target == document.getElementById('start')) {
      const interval = setInterval(() => this.squareService.changeSquare(this.elementList), 3000);

      this.squareService.changeSquare(this.elementList);
      this.gameService.setInterval(interval);
    }
  }
}
