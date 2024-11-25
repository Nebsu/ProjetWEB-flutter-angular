import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Todo } from '../../../models/todo.model';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FireService } from '../../../core/services/fire.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditCardComponent } from "./edit-card/edit-card.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DatePipe, FormsModule, EditCardComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() card!: Todo;

  constructor(private fireService: FireService, private ngbModal: NgbModal) {}

  toggleCompleted() {
    this.fireService.updateItem(this.card.id, { completed: this.card.completed });
  }

  openModal(content: TemplateRef<any>) {
    this.ngbModal.open(content, { centered: true });
  }

  saveChanges(editCard: EditCardComponent, modal: NgbModalRef) {
    editCard.save();
    modal.close();

    const updateData: Partial<Todo> = {
      title: this.card.title,
      content: this.card.content,
    };

    if (this.card.dueDate) {
      updateData.dueDate = this.card.dueDate;
    }

    this.fireService.updateItem(this.card.id, updateData);
  }

  deleteTodo() {
    this.fireService.deleteItem(this.card.id);
  }
}