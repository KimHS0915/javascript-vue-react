// const React = require('react');
import React from 'react';

// const ReactDom = require('react-dom');
import ReactDom from 'react-dom';

// const { hot } = require('react-hot-loader/root');
import { hot } from 'react-hot-loader/root';

// const Lotto = require('./LottoClass');
import Lotto from './LottoClass';

const Hot = hot(Lotto);

ReactDom.render(<Hot />, document.querySelector('#root'));