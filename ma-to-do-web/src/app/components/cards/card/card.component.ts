import { Component, Input } from '@angular/core';
import { Todo } from '../../../models/todo.model';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FireService } from '../../../core/services/fire.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() card!: Todo;

  constructor(private fireService: FireService) {}

  editTodo() {
    //afficher la modal
    
  }
  
  toggleCompleted() {
    this.fireService.updateItem(this.card.id, { completed: this.card.completed });
  }
  
}
