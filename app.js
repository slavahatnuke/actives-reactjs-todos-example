import React from 'react';
import {render} from 'react-dom';

// get app from the box
import box from './Todos/box';

// and render
render(<box.TodoApp/>, document.getElementById('app'));
