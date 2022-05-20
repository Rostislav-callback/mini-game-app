import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SquaresService } from '../game-area/services/squares.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  isWinner!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {playerScore: string, computerScore: string},
    public dialog: MatDialog,
    private squareService: SquaresService
  ) {}

  ngOnInit(): void {
    this.showWinner();
  }

  closeModal() {
    this.dialog.closeAll();
  }

  showWinner() {
    if (this.data.computerScore == '10') this.isWinner = false;
    if (this.data.playerScore == '10') this.isWinner = true;
  }

  ngOnDestroy(): void {
    this.squareService.endGame();
  }
}
