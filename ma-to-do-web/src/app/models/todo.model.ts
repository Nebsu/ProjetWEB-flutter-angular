import { Timestamp } from "@angular/fire/firestore";

export interface Todo {
    id: string;
    completed: boolean;
    expired: boolean;
    content: string;
    creationDate: Timestamp;
    dueDate?: Timestamp;
    title: string;
}