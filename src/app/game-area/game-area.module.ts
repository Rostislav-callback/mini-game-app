import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

import { GameAreaComponent } from './game-area.component';
import { SquareModule } from '../square/square.module';
import { SquareDirective } from './directives/square.directive';



@NgModule({
  declarations: [
    GameAreaComponent,
    SquareDirective
  ],
  imports: [
    CommonModule,
    SquareModule,
    MatGridListModule
  ],
  exports: [
    GameAreaComponent
  ]
})
export class GameAreaModule { }
