import { Component, OnInit } from '@angular/core';
import { PieceComponent } from '../piece/piece.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: number[][] =[[],[],[],[],[],[],[]]

  constructor() { }

  addpiece(column:number): void{
    
    this.board[column].push(0)
    console.log(this.board);
  }
  ngOnInit(): void {
  }

}
