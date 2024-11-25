import { Component, OnInit } from '@angular/core';
import { FireService } from '../../core/services/fire.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  items$ !: Observable<Todo[]>;

  constructor(private fireService: FireService) { }

  ngOnInit(): void {
    this.items$ = this.fireService.getItems();
    this.items$.subscribe(data => {
      console.log(data);
    });
    
  }

  onClick(): void {
    this.fireService.putItem('test');
  }

  update(): void {
    this.fireService.updateItem('CnWdLKTc0X65nXb1TmcG', { completed: true });
  }

}
