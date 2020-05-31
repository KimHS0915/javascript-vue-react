import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';

import Router from './Router';

const Hot = hot(Router);

ReactDom.render(<Hot />, document.querySelector('#root'));