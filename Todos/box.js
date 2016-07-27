import {Box} from 'actives';
import connect from 'actives-react';

import Todo from './Todo';
import TodoList from './TodoList';
import TodoEditor from './TodoEditor';
import TodoApp from './TodoApp';
import TodoService from './TodoService';

let box = new Box;

box.add('TodoService', TodoService);

box.add('Todo', ({TodoState}) => connect(TodoState)(Todo()));
box.add('TodoList', ({Todo, TodoListState}) => connect(TodoListState)(TodoList({Todo})));
box.add('TodoEditor', ({TodoEditorState}) => connect(TodoEditorState)(TodoEditor()));

box.add('TodoApp', TodoApp);

box.connect('TodoEditorState', 'TodoService')
    .state(({TodoService}) => {
        return {
            todo: TodoService.getTodo()
        }
    })
    .actions(({TodoService}) => {
        return {
            onSave: (todo) => TodoService.save(todo)
        }
    });

box.connect('TodoListState', 'TodoService')
    .state(({TodoService}) => {
        return {
            todos: TodoService.getTodos()
        }
    });

box.connect('TodoState', 'TodoService')
    .actions(({TodoService}) => {
        return {
            onRemove: (id) => TodoService.remove(id),
            onToggle: (id) => TodoService.toggle(id)
        }
    });



export default box;



