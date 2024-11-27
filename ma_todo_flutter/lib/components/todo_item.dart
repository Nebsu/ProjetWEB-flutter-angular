import 'dart:async';

import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:intl/intl.dart';
import '../services/todo_service.dart';

class TodoItem extends StatefulWidget {
  final Map<String, dynamic> todo;

  TodoItem({required this.todo});

  @override
  _TodoItemState createState() => _TodoItemState();
}

class _TodoItemState extends State<TodoItem> {
  void _toggleComplete() async {
    setState(() {
      widget.todo['completed'] = !widget.todo['completed'];
    });
    await TodoService().updateTodoState(
      widget.todo['id'],
      widget.todo['completed'],
    );
  }

  bool _isExpired() {
    if (widget.todo['dueDate'] != null) {
      if(widget.todo['dueDate'].compareTo(Timestamp.now()) == -1){
        return true;
      }
    }
    return false;
  } 

  void _editTodo() {
    TextEditingController titleController = TextEditingController(text: widget.todo['title']);
    TextEditingController contentController = TextEditingController(text: widget.todo['content']);
    TextEditingController dueDateController = TextEditingController(text: widget.todo['dueDate'] != null ? DateFormat('dd-MM-yyyy').format((widget.todo['dueDate'] as Timestamp).toDate()) : '');

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Modifier le Todo'),
          content: Container(
            width: MediaQuery.of(context).size.width * 0.8,
            child: SingleChildScrollView(
              child: Column(
                children: [
                  TextField(
                    controller: titleController,
                    decoration: InputDecoration(labelText: 'Titre'),
                  ),
                  TextField(
                    controller: contentController,
                    decoration: InputDecoration(labelText: 'Description'),
                  ),
                  TextField(
                    controller: dueDateController,
                    decoration: InputDecoration(labelText: 'Date d\'échéance'),
                    onTap: () async {
                      DateTime? pickedDate = await showDatePicker(
                        context: context,
                        initialDate: DateTime.now(),
                        firstDate: DateTime(2000),
                        lastDate: DateTime(2101),
                      );
                      if (pickedDate != null) {
                        dueDateController.text = DateFormat('dd-MM-yyyy').format(pickedDate);
                      }
                    },
                  ),
                ],
              ),
            ),
          ),
          actions: [
            TextButton(
              child: Text('Annuler'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text('Sauvegarder'),
              onPressed: () async {
                await FirebaseFirestore.instance.collection('todo').doc(widget.todo['id']).update({
                  'title': titleController.text,
                  'content': contentController.text,
                  'dueDate': dueDateController.text.isNotEmpty ? Timestamp.fromDate(DateFormat('dd-MM-yyyy').parse(dueDateController.text)) : null,
                });
                setState(() {
                  widget.todo['title'] = titleController.text;
                  widget.todo['content'] = contentController.text;
                  widget.todo['dueDate'] = dueDateController.text.isNotEmpty ? Timestamp.fromDate(DateFormat('dd-MM-yyyy').parse(dueDateController.text)) : null;
                });
                Navigator.of(context).pop();
              },
            ),
          ],
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(20.0)),
          ),
        );
      },
    );
  }

  void _deleteTodo() async {
    await TodoService().deleteTodo(widget.todo['id']);
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final DateFormat formatter = DateFormat('dd-MM-yyyy');
    final DateTime creationDateTime = (widget.todo['creationDate'] as Timestamp).toDate();
    final String creationDate = formatter.format(creationDateTime);
    final DateTime? dueDateTime = widget.todo['dueDate'] != null ? (widget.todo['dueDate'] as Timestamp).toDate() : null;
    final String? dueDate = dueDateTime != null ? formatter.format(dueDateTime) : null;

    return Container(
      decoration: BoxDecoration(
        color: widget.todo['completed']
            ? Color.fromARGB(255, 152, 255, 152)
            : _isExpired()
                ? const Color.fromARGB(255, 255, 149, 149)
                : const Color.fromARGB(255, 255, 228, 138),
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(8.0),
      ),
      margin: EdgeInsets.symmetric(vertical: 8.0),
      padding: EdgeInsets.all(8.0),
      child: ListTile(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              widget.todo['title'] ?? 'Titre ',
              style: TextStyle(
                fontSize: 18.0,
                fontWeight: FontWeight.bold,
                decoration: widget.todo['completed']
                    ? TextDecoration.lineThrough
                    : TextDecoration.none,
                decorationColor: _isExpired()
                    ? Colors.red
                    : Colors.amber,
              ),
            ),
            Text('Créé le: $creationDate'),
            if (dueDate != null)
              Text('Pour le: $dueDate \n'),

            if (widget.todo['content'] != null)
              Text(widget.todo['content']),
          ],
        ),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            IconButton(
              icon: Icon(Icons.edit),
              onPressed: _editTodo,
            ),
            IconButton(
              icon: Icon(Icons.delete),
              onPressed: _deleteTodo,
            ),
          ],
        ),
        leading: Checkbox(
          value: widget.todo['completed'],
          onChanged: (value) {
            _toggleComplete();
          },
        ),
      ),
    );
  }
}