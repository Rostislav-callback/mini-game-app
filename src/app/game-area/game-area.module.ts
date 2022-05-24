import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { GameAreaComponent } from './game-area.component';
import { SquareModule } from '../square/square.module';
import { SquareDirective } from './directives/square.directive';
import { ModalModule } from '../modal/modal.module';



@NgModule({
  declarations: [
    GameAreaComponent,
    SquareDirective
  ],
  imports: [
    CommonModule,
    SquareModule,
    ModalModule,
    MatInputModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [
    GameAreaComponent
  ]
})
export class GameAreaModule { }
