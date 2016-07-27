import React from 'react';

export default ({TodoEditor, TodoList}) => () => {
    return <div>
        <TodoEditor></TodoEditor>
        <TodoList></TodoList>
    </div>;
} 