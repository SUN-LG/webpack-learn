import React from 'react';
import ReactDom from 'react-dom';
import App from './App.jsx';

import {add} from './math';

ReactDom.render(<App></App>, document.getElementById('root'))

add(1, 2)

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    console.log('hmr')
    ReactDom.render(<App></App>, document.getElementById('root'))
  })
}