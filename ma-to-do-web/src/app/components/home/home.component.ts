import { Component, OnInit } from '@angular/core';
import { FireService } from '../../core/services/fire.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Todo } from '../../models/todo.model';
import { CreateInputComponent } from "../create-input/create-input.component";
import { CardsComponent } from "../cards/cards.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CreateInputComponent, CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
