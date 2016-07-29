import React from 'react';

export default () => ({todo, onToggle, onRemove}) => {
    return <div>
        <span>{todo.title}</span>
        <span> [{todo.status ? 'DONE' : 'WIP'}] </span>
        <button onClick={() => onToggle(todo.id) }>toggle</button>
        <button onClick={() => onRemove(todo.id) }>remove</button>
    </div>;
} 