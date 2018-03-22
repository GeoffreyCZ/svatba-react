import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import './App.css';
import WeddingForm from './containers/WeddingForm/WeddingForm';
import Auth from './containers/Auth/Auth';

class App extends Component {

	render() {
		let routes = (
			<Switch>
				<Route path="/prihlaseni" component={Auth}/>
				<Route path="/" exact component={WeddingForm}/>
			</Switch>
		);

		return (
			<div>
				{routes}
			</div>
		);
	}
}

export default withRouter(App);
