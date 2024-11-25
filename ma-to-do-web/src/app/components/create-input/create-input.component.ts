import { Component } from '@angular/core';
import { FireService } from '../../core/services/fire.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-input',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './create-input.component.html',
  styleUrl: './create-input.component.scss'
})
export class CreateInputComponent {
  newTodoTitle: string = '';

  constructor(private fireService: FireService) { }
  
  addTodo() {
    this.fireService.putItem(this.newTodoTitle);
  }

}
