export interface Todo {
    completed: boolean;
    content: string;
    creationDate: Date;
    dueDate?: Date;
    title: string;
}