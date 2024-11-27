import 'package:flutter/material.dart';
import '../components/todo_creation_bar.dart';
import '../components/todo_list.dart';

class HomeView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('TOUT DOUX LISTE'),
      ),
      body: Column(
        children: <Widget>[
          TodoCreationBar(),
          Expanded(child: TodoList()),
        ],
      ),
    );
  }
}