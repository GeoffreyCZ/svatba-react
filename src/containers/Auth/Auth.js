import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Card} from 'react-materialize';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import {Col, Preloader, Icon} from 'react-materialize';
import './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {

	componentDidMount() {
		if (this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		}
	}

	state = {
		controls: {
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					label: 'Heslo, které je na Vaší pozvánce',
					icon: <Icon>fingerprint</Icon>
				},
				value: '',
				valid: true,
				touched: false
			}
		}
	};

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				touched: true
			}
		};
		this.setState({controls: updatedControls});
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.password.value);
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		let form = formElementsArray.map(formElement => (
			<Input
				show={true}
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
		));

		if (this.props.loading) {
			form = (
				<Col s={4}>
					<Preloader size='big'/>
				</Col>);
		}

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = (
				<p>{this.props.error.message}</p>
			);
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath}/>
		}

		return (
			<div className='auth'>
				<Card className='purple darken-4 white-text authForm' s={6}>
					{authRedirect}
					{errorMessage}
					<h5>Formulář pro svatební hosty</h5>
					<form onSubmit={this.submitHandler}>
						{form}
						<Button btnType="Success">Přihlásit se</Button>
					</form>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.password !== null,
		authRedirectPath: state.auth.authRedirectPath
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (password) => dispatch(actions.auth(password)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);