import React from 'react';

export default ({Todo}) => ({todos = []}) => {
    return <div>
        {todos.map(todo =><Todo key={todo.id} {...todo}/>)}
    </div>;
} 