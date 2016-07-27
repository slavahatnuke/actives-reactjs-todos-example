import React from 'react';
import {render} from 'react-dom';

import {Box} from 'actives';
import connect from 'actives-react';

let Hello = () => <div>hello</div>;

render(<Hello/>, document.getElementById('app'));
