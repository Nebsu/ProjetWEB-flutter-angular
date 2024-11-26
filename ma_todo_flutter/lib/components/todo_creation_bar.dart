import 'package:flutter/material.dart';
import '../services/todo_service.dart';

class TodoCreationBar extends StatefulWidget {
  @override
  _TodoCreationBarState createState() => _TodoCreationBarState();
}

class _TodoCreationBarState extends State<TodoCreationBar> {
  final TextEditingController _controller = TextEditingController();

  void _addTodo() async {
    if (_controller.text.isNotEmpty) {
      await TodoService().addTodo(_controller.text);
      _controller.clear();
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        children: <Widget>[
          Expanded(
            child: TextField(
              controller: _controller,
              decoration: InputDecoration(
                labelText: 'Nouvelle tâche',
              ),
            ),
          ),
          IconButton(
            icon: Icon(Icons.add),
            onPressed: _addTodo,
          ),
        ],
      ),
    );
  }
}