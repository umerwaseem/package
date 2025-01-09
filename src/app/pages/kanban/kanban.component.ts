import { Component } from '@angular/core';
import { BoardService } from './services/board.service';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board/board.component';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    CommonModule,
    BoardComponent,
    DialogComponent
  ],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent {
  constructor(public boardService: BoardService) { }

  addColumn(event: any) {
    if (event) {
      this.boardService.addColumn(event)
    }
  }
}
