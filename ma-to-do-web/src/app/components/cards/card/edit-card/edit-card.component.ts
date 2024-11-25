import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../../../models/todo.model';
import { FormsModule } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-card',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './edit-card.component.html',
  styleUrl: './edit-card.component.scss'
})
export class EditCardComponent implements OnInit {
  @Input() card!: Todo;
  cardEdit!: Todo;
  date!: string | null;
  datePipe = new DatePipe('en-US');

  constructor() {}

  ngOnInit(): void {
    this.cardEdit = { ...this.card };
    if(this.card.dueDate) {
      this.date = this.datePipe.transform(this.card.dueDate.toDate(), 'yyyy-MM-dd');
    }
  }

  save() {
    this.card.title = this.cardEdit.title;
    this.card.content = this.cardEdit.content;
    if(this.date) {
      this.card.dueDate = Timestamp.fromDate(new Date(this.date));
    }
  }
}