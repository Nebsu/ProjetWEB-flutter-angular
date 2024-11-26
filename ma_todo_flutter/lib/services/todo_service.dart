import 'package:cloud_firestore/cloud_firestore.dart';

class TodoService {
  final CollectionReference _todosCollection = FirebaseFirestore.instance.collection('todo');

  Stream<List<Map<String, dynamic>>> getTodosStream() {
    return _todosCollection.snapshots().map((snapshot) {
      return snapshot.docs.map((doc) {
        return {
          'id': doc.id,
          ...doc.data() as Map<String, dynamic>,
        };
      }).toList();
    });
  }

  Future<void> addTodo(String title) async {
    await _todosCollection.add({
      'title': title,
      'completed': false,
      'content': '',
      'creationDate': Timestamp.now(),
      'dueDate': null,
    });
  }

  Future<void> updateTodo(String id, String title, String content, String dueDate) async {
    final data = {
      'title': title,
      'content': content,
      'dueDate': dueDate,
    };
    await _todosCollection.doc(id).update(data);
  }

  Future<void> updateTodoState(String id, bool completed) async {
    await _todosCollection.doc(id).update({'completed': completed});
  }

  Future<void> deleteTodo(String id) async {
    await _todosCollection.doc(id).delete();
  }
}