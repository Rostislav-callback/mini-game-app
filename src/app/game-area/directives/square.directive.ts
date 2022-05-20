import { Directive, ElementRef, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SquaresService } from '../services/squares.service';

@Directive({
  selector: '[appSquare]'
})
export class SquareDirective {
  elementList: any = this.elementRef.nativeElement.childNodes;
  time$!: BehaviorSubject<number>;

  constructor(private elementRef: ElementRef,
    private squareService: SquaresService) {}

  @HostListener('document:click', ['$event']) onClick(event: Event) {
    if (event.target == document.getElementById('start')) {
      this.squareService.changeSquare(this.elementList);
      setInterval(() => this.squareService.changeSquare(this.elementList), 3000);
    }
  }
}
