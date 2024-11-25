import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private fireStore: Firestore) { }
  
  getItems(): Observable<Todo[]> {
    const itemCollection = collection(this.fireStore, 'todo');
    return collectionData<Todo>(itemCollection, { idField: 'id' });
  }

  putItem(title: string): void {
    const itemCollection = collection(this.fireStore, 'todo');
    const item: Todo = {
      completed: false,
      content: '',
      creationDate: new Date(),
      title
    }
    addDoc(itemCollection, item);
  }

  updateItem(id: string, data: Partial<Todo>): Promise<void> {
    const itemDoc = doc(this.fireStore, `todo/${id}`);
    return updateDoc(itemDoc, data);
  }
  
}