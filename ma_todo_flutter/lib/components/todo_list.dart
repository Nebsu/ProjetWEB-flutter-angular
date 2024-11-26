import 'package:flutter/material.dart';
import '../services/todo_service.dart';
import 'todo_item.dart';

class TodoList extends StatelessWidget {
  const TodoList({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<List<Map<String, dynamic>>>(
      stream: TodoService().getTodosStream(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(child: CircularProgressIndicator());
        }
        if (snapshot.hasError) {
          return Center(child: Text('Erreur: ${snapshot.error}'));
        }
        final todos = snapshot.data ?? [];
        return ListView.builder(
          itemCount: todos.length,
          itemBuilder: (context, index) {
            return TodoItem(todo: todos[index]);
          },
        );
      },
    );
  }
}