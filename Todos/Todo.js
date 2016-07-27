import React from 'react';

export default () => ({title, status, id, onToggle, onRemove}) => {
    return <div>
        <span>{title}</span>
        <span>[ {status ? 'DONE' : 'IN PROGRESS'} ] </span>
        <button onClick={() => onToggle(id) }>{status ? 'S1' : 'S2'}</button>
        <button onClick={() => onRemove(id) }>remove</button>
    </div>;
} 