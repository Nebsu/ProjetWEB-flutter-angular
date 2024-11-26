import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.model';

@Pipe({
  name: 'sortTodo',
  standalone: true
})
export class SortTodoPipe implements PipeTransform {

  transform(todos: Todo[] | null): Todo[] {
    if (!todos) {
      return [];
    }
    return todos.sort((a, b) => {
      // Trier par état de complétion (non complétés en premier)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      // Trier par dueDate (ceux avec dueDate en premier)
      if (a.dueDate && !b.dueDate) {
        return -1;
      }
      if (!a.dueDate && b.dueDate) {
        return 1;
      }

      // Trier par dueDate ou creationDate
      const dateA = a.dueDate ? a.dueDate.toDate() : a.creationDate.toDate();
      const dateB = b.dueDate ? b.dueDate.toDate() : b.creationDate.toDate();
      return dateA.getTime() - dateB.getTime();
    });
  }

}