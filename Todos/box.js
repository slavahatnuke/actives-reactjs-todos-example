// actives box
import {Box} from 'actives';

// function that connect state to view.
import connect from 'actives-react';

// pure views.
import Todo from './Todo';
import TodoList from './TodoList';
import TodoEditor from './TodoEditor';
import TodoApp from './TodoApp';
import TodoService from './TodoService';

// box, it register service and make states.
let box = new Box;

// add service.
box.add('TodoService', TodoService);

// it makes connected view with state. state + view = widget. TodoState is described below.
box.add('Todo', ({TodoState}) => connect(TodoState, Todo()));

// make TodoList widget.
box.add('TodoList', ({Todo, TodoListState}) => connect(TodoListState, TodoList({Todo})));

// make TodoEditor widget.
box.add('TodoEditor', ({TodoEditorState}) => connect(TodoEditorState, TodoEditor()));

// it's just pure view, but it gets `TodoList` and `TodoEditor` widgets from the box.
box.add('TodoApp', TodoApp);

// make state for TodoEditor widget.
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

// make state for TodoList widget.
box.connect('TodoListState', 'TodoService')
    .state(({TodoService}) => {
        return {
            todos: TodoService.getTodos()
        }
    });

// make state for Todo widget.
box.connect('TodoState', 'TodoService')
    .actions(({TodoService}) => {
        return {
            onRemove: (id) => TodoService.remove(id),
            onToggle: (id) => TodoService.toggle(id)
        }
    });

export default box;



