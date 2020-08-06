import React from 'react';
import {render} from 'react-dom';
import App from './App'

const dom = document.createElement('div');
dom.id = 'root';
document.body.appendChild(dom);

render(<App />,dom);

if(module.hot){
	module.hot.accept('./App.js', function() {
		render(<App />,dom)
	})
}