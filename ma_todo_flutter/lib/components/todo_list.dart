import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import '../services/todo_service.dart';
import 'todo_item.dart';

class TodoList extends StatelessWidget {
  const TodoList({super.key});

  List<Map<String, dynamic>> _sortTodos(List<Map<String, dynamic>> todos) {
    todos.sort((a, b) {
      // Trier par état de complétion (non complétés en premier)
      if (a['completed'] != b['completed']) {
        return a['completed'] ? 1 : -1;
      }

      // Trier par dueDate (ceux avec dueDate en premier)
      if (a['dueDate'] != null && b['dueDate'] == null) {
        return -1;
      }
      if (a['dueDate'] == null && b['dueDate'] != null) {
        return 1;
      }

      // Trier par dueDate ou creationDate
      DateTime dateA = a['dueDate'] != null ? (a['dueDate'] as Timestamp).toDate() : (a['creationDate'] as Timestamp).toDate();
      DateTime dateB = b['dueDate'] != null ? (b['dueDate'] as Timestamp).toDate() : (b['creationDate'] as Timestamp).toDate();
      return dateA.compareTo(dateB);
    });
    return todos;
  }

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
        final sortedTodos = _sortTodos(todos);
        return ListView.builder(
          itemCount: sortedTodos.length,
          itemBuilder: (context, index) {
            return TodoItem(todo: sortedTodos[index]);
          },
        );
      },
    );
  }
}