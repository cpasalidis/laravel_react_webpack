import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css'; //imports bootstrap.min.css also
import ReactApp from './ReactApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ReactApp />, document.getElementById('root'));
registerServiceWorker();
