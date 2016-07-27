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
        if(todo.id) {
            // nothing
        } else {
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
