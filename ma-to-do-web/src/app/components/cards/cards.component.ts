import { Component, OnInit } from '@angular/core';
import { FireService } from '../../core/services/fire.service';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { AsyncPipe } from '@angular/common';
import { CardComponent } from "./card/card.component";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [AsyncPipe, CardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  items$ !: Observable<Todo[]>;

  constructor(private fireService: FireService) { }

  ngOnInit(): void {
    this.items$ = this.fireService.getItems();
  }

}
