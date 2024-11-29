import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Todo } from '../../../models/todo.model';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FireService } from '../../../core/services/fire.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditCardComponent } from "./edit-card/edit-card.component";
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DatePipe, FormsModule, EditCardComponent, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit, OnChanges{
  @Input() card!: Todo;

  constructor(private fireService: FireService, private ngbModal: NgbModal) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.updateComponent();
  }

  ngOnInit(): void {
    this.updateComponent();
  }
  
  updateComponent() {
    if(this.card.dueDate) {
      this.card.expired = this.card.dueDate.toDate() < Timestamp.now().toDate();
    }
  }

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