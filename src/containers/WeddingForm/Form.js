import React from 'react';
import {Preloader, Toast, Icon, Card, Col} from 'react-materialize';
import {NotificationContainer, NotificationManager} from 'react-notifications';


import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import axios from './../../axios-orders';

import './WeddingForm.css';
import 'react-notifications/lib/notifications.css';

class Form extends React.Component {
	componentWillMount() {
		const updatedState = {
			...this.state
		};

		for (let formElementIdentifier in updatedState.guest) {
			if (this.props.data[formElementIdentifier] !== undefined) {
				if (formElementIdentifier === 'plusOne') {
					updatedState.guest[formElementIdentifier].elementConfig.checked = this.props.data[formElementIdentifier];
				} else {
					updatedState.guest[formElementIdentifier].valid = true;
					updatedState.guest[formElementIdentifier].value = this.props.data[formElementIdentifier];
				}
			}
		}
		if (this.state.guest.plusOne.elementConfig.checked) {
			updatedState.guest['nameTwo'].show = true;
			updatedState.guest['accommodationTwo'].show = true;
			updatedState.guest['foodRequirementTwo'].show = true;

			updatedState.guest['nameTwo'].valid = true;
		}

		this.setState({updatedState});
	}

	state = {
		guest: {
			nameOne: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					label: 'Vaše jméno a příjmení',
					icon: <Icon>account_box</Icon>,
					className: ''
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				show: true,
			},
			accommodationOne: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'accommodation', displayValue: 'Ano, chci zajistit ubytování'},
						{value: 'haveDriver', displayValue: 'Ne, plánuji po oslavě odjet a mám vlastní odvoz'},
						{value: 'needDriver', displayValue: 'Ne, plánuji po oslavě odjet a potřebuji zajistit odvoz'}
					],
					label: 'Ubytování a odjezd',
				},
				value: null,
				valid: true,
				show: true
			},
			foodRequirementOne: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					label: 'Alergie na potraviny',
					icon: <Icon>local_dining</Icon>
				},
				value: '',
				valid: true,
				show: true
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					label: 'Kontaktní e-mail',
					icon: <Icon>mail</Icon>,
					className: ''
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				touched: false,
				show: true,
				valid: true,
			},
			nrOfSeats: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					label: 'Počet volných míst ve Vašem autě',
					icon: <Icon>directions_car</Icon>

				},
				value: '',
				validation: {
					required: true,
					isNumeric: true
				},
				valid: true,
				show: true
			},
			plusOne: {
				elementType: 'input',
				elementConfig: {
					type: 'checkbox',
					checked: false,
					label: 'Mám doprovod',
					icon: <Icon>plus_one</Icon>
				},
				valid: true,
				show: true
			},
			nameTwo: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					label: 'Jméno a příjmení Vašeho doprovodu',
					icon: <Icon>account_box</Icon>,
					className: ''
				},
				value: '',
				validation: {
					required: false
				},
				valid: true,
				touched: false,
				show: false
			},
			accommodationTwo: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'accommodation', displayValue: 'Ano, chci zajistit ubytování'},
						{value: 'haveDriver', displayValue: 'Ne, plánuji po oslavě odjet a mám vlastní odvoz'},
						{value: 'needDriver', displayValue: 'Ne, plánuji po oslavě odjet a potřebuji zajistit odvoz'}
					],
					label: 'Ubytování a odjezd'
				},
				value: 'accommodation',
				valid: true,
				show: false
			},
			foodRequirementTwo: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					label: 'Alergie na potraviny',
					icon: <Icon>local_dining</Icon>
				},
				value: '',
				valid: true,
				show: false
			},
			note: {
				elementType: 'textarea',
				elementConfig: {
					label: 'Poznámka',
					icon: <Icon>border_color</Icon>
				},
				value: '',
				validation: {
					required: false
				},
				valid: true,
				show: true
			},
		},
		formIsValid: false,
		loading: false,
		success: false
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});
		const formData = {};
		for (let formElementIdentifier in this.state.guest) {
			formData[formElementIdentifier] = this.state.guest[formElementIdentifier].value;
		}
		console.log(formData);
		const password = localStorage.getItem('password');
		const data = {
			[password]: formData
		};
		axios.patch('/guests.json', data)
			.then(response => {
				this.setState({loading: false});
				NotificationManager.success('Uloženo!', 'Jupí!');
			})
			.catch(error => {
				this.setState({loading: false});
				console.log(error);
				NotificationManager.error('Něco se pokazilo! :(', 'Safra!');
			});
	};

	checkValidity = (value, rules) => {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid
		}

		return isValid;
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedForm = {
			...this.state.guest
		};

		const updatedFormElement = {
			...updatedForm[inputIdentifier]
		};

		if (inputIdentifier === 'plusOne') {
			if (updatedFormElement.elementConfig.checked) {
				updatedForm['nameTwo'].show = false;
				updatedForm['accommodationTwo'].show = false;
				updatedForm['foodRequirementTwo'].show = false;

				updatedForm['nameTwo'].valid = true;
				updatedFormElement.elementConfig.checked = false;
			} else {
				updatedForm['nameTwo'].show = true;
				updatedForm['accommodationTwo'].show = true;
				updatedForm['foodRequirementTwo'].show = true;

				updatedForm['nameTwo'].valid = true;
				updatedFormElement.elementConfig.checked = true;
			}
		}

		if (inputIdentifier === 'car') {
			updatedForm['nrOfSeats'].show = !updatedForm['nrOfSeats'].show;
			updatedForm['nrOfSeats'].valid = !updatedForm['nrOfSeats'].valid;
			updatedFormElement.elementConfig.checked = !updatedFormElement.elementConfig.checked;
		}

		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.valid ? updatedFormElement.elementConfig.className = 'valid' : updatedFormElement.elementConfig.className = 'invalid';
		updatedFormElement.touched = true;
		updatedForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedForm) {
			formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({guest: updatedForm, formIsValid: formIsValid});

	};

	render() {
		const formElementsPersonOneArray = [];
		for (let key in this.state.guest) {
			formElementsPersonOneArray.push({
				id: key,
				config: this.state.guest[key]
			});
		}
		for (let key in this.state.common) {
			formElementsPersonOneArray.push({
				id: key,
				config: this.state.common[key]
			});
		}
		const formElementsPersonTwoArray = [];
		for (let key in this.state.personTwo) {
			formElementsPersonTwoArray.push({
				id: key,
				config: this.state.personTwo[key]
			});
		}

		let form = (
			<form onSubmit={this.submitHandler}>
				{formElementsPersonOneArray.map(formElement => (
					<Col s={8} key={formElement.id}>
						<Input
							show={formElement.config.show}
							label={formElement.config.label}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
							changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
					</Col>
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>Uložit</Button>
			</form>
		);

		if (this.state.loading) {
			form = (
				<Preloader size='big' flashing className='loading'/>
			)
		}
		return (
			<div className='wForm'>
				<NotificationContainer/>
				<Card className='purple darken-4 white-text weddingForm'>
					<h5>Formulář pro svatební hosty</h5>
					{form}
				</Card>
			</div>
		);
	}
}

export default Form;