import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import ReactApp from './ReactApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ReactApp />, document.getElementById('root'));
registerServiceWorker();
