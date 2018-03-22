import React from 'react';
import {Redirect} from 'react-router-dom';

import Form from './Form';
import axios from './../../axios-orders';

import {Col, Preloader} from 'react-materialize';
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class WeddingForm extends React.Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
		this.props.onInitData();
	}

	state = {
		loading: false
	};

	render() {
		let form;
		if (this.props.data) {
			form = <Form data={this.props.data}/>
		}
		if (this.state.loading) {
			form = (
				<Col s={4}>
					<Preloader size='big'/>
				</Col>);
		}
		if (!this.props.isAuthenticated) {
			form = <Redirect to="/prihlaseni"/>;
		}
		return (
			<div>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		data: state.guest.data,
		isAuthenticated: state.auth.password !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onInitData: () => dispatch(actions.initData()),
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeddingForm, axios));
