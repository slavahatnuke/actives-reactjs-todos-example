# Todo List - ReactJS Actives  example. 
There is an example how to use `ReactJS` and `actives`.

### How to start
- `npm install`
- `npm start`
- `http://localhost:8080/` [http://localhost:8080/](http://localhost:8080/)

### How does it look?
`app.js`

```javascript
import React from 'react';
import {render} from 'react-dom';

// get app from the box
import box from './Todos/box';

// and render
render(<box.TodoApp/>, document.getElementById('app'));
```

### Views - pure views (PW)
There are examples:

`Todos/Todo.js` [Todos/Todo.js](Todos/Todo.js)
```javascript
import React from 'react';

export default () => ({todo, onToggle, onRemove}) => {
    return <div>
        <span>{todo.title}</span>
        <span> [{todo.status ? 'DONE' : 'WIP'}] </span>
        <button onClick={() => onToggle(todo.id) }>toggle</button>
        <button onClick={() => onRemove(todo.id) }>remove</button>
    </div>;
} 
```

`Todos/TodoList.js` [Todos/TodoList.js](Todos/TodoList.js)
In this example we inject __Todo__

```javascript
import React from 'react';

export default ({Todo}) => ({todos = []}) => {
    return <div>
        {todos.map(todo =><Todo key={todo.id} todo={todo}/>)}
    </div>;
} 
```

`Todos/TodoEditor.js` [Todos/TodoEditor.js](Todos/TodoEditor.js)

```javascript
import React from 'react';

export default () => ({todo, onSave}) => {
    let input;
    let save = () => {
        todo.title = input.value;
        onSave(todo);
        input.value = '';
    };
    return <div>
        <input type="text" placeholder="title" ref={(el) => input = el}/>
        <button onClick={save}>save</button>
    </div>;
} 
```

`Todos/TodoEditor.js` [Todos/TodoEditor.js](Todos/TodoEditor.js)

```javascript
import React from 'react';

export default () => ({todo, onSave}) => {
    let input;
    let save = () => {
        todo.title = input.value;
        onSave(todo);
        input.value = '';
    };
    return <div>
        <input type="text" placeholder="title" ref={(el) => input = el}/>
        <button onClick={save}>save</button>
    </div>;
} 
```

`Todos/TodoApp.js` [Todos/TodoApp.js](Todos/TodoApp.js)
In this example we inject __TodoEditor__ and __TodoList__
```javascript
import React from 'react';

export default ({TodoEditor, TodoList}) => () => {
    return <div>
        <TodoEditor></TodoEditor>
        <TodoList></TodoList>
    </div>;
} 
```

## Logic - pure logic (PL)
`Todos/TodoService.js` [Todos/TodoService.js](Todos/TodoService.js)
```javascript
export default class TodoService {
    constructor() {
        this.todos = [];
        this.todo = null;
        this.nextId = 1;
    }

    getTodo() {
        return this.todo || {title: '', status: false};
    }

    save(todo) {
        if (!todo.id) {
            todo.id = this.nextId++;
            this.add(todo);
        }
    }

    getTodos() {
        return this.todos;
    }

    add(todo) {
        this.todos.push(todo)
    }

    remove(id) {
        let todo = this.get(id);
        todo && this.todos.splice(this.todos.indexOf(todo), 1)
    }

    toggle(id) {
        let todo = this.get(id);
        todo.status = !todo.status;
    }

    get(id) {
        return this.todos.find((todo) => todo.id === id)
    }
}
```


## Connect Logic to Views
For this goal we use __box__. It allows to add service and make states for the views.
Then we connect states to views.


```javascript
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

// box, it registers service and makes states.
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
```

### Counter example
It an example with counter. [example](https://github.com/slavahatnuke/actives-reactjs-counter-example)

##### actives
The main idea of [actives](https://github.com/slavahatnuke/actives)
