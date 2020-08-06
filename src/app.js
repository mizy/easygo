import React from 'react';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.less';

export default ()=>{
	return  (
	<Router >
		<Switch>
			<Route path="/" exact component={require( './pages/Home').default} />
			<Route path="/recorder" exact component={require( './pages/Recorder').default} />
		</Switch>
	</Router>
  )
};
