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