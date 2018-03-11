import React from 'react';

import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import Spinner from './../../components/UI/Spinner/Spinner';
import axios from './../../axios-orders';

import classes from './WeddingForm.css';

class WeddingForm extends React.Component {

	state = {
		guest: {
			nameOne: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: ''
				},
				label: 'Jméno a příjmení',
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				show: true
			},
			accomodationOne: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'accomodation', displayValue: 'Ano, chci zajistit ubytování'},
						{value: 'haveDriver', displayValue: 'Ne, plánuji po oslavě odjet a mám vlastní odvoz'},
						{value: 'needDriver', displayValue: 'Ne, plánuji po oslavě odjet a potřebuji zajistit odvoz'}
					]
				},
				label: 'Ubytování a odjezd',
				value: 'accomodation',
				valid: true,
				show: true
			},
			foodRequirementOne: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: ''
				},
				label: 'Alergie na potraviny',
				value: '',
				valid: true,
				show: true
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: ''
				},
				label: 'Kontaktní e-mail',
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false,
				show: true
			},
			car: {
				elementType: 'input',
				elementConfig: {
					type: 'checkbox',
					placeholder: ''
				},
				label: 'Mám místo v autě a můžu někoho vzít',
				value: 'false',
				validation: {
					required: true
				},
				valid: true,
				show: true
			},
			nrOfSeats: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: ''
				},
				label: 'Počet volných míst v autě',
				value: '',
				validation: {
					required: true,
					isNumeric: true
				},
				valid: true,
				show: false
			},
			note: {
				elementType: 'textarea',
				label: 'Poznámka',
				value: '',
				validation: {
					required: false
				},
				valid: true,
				show: true
			},
			plusOne: {
				elementType: 'input',
				elementConfig: {
					type: 'checkbox',
					placeholder: '',
					checked: false
				},
				label: 'Mám doprovod',
				valid: true,
				show: true
			},
			nameTwo: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: ''
				},
				label: 'Jméno a příjmení',
				value: '',
				validation: {
					required: false
				},
				valid: true,
				touched: false,
				show: false
			},
			accomodationTwo: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'accomodation', displayValue: 'Ano, chci zajistit ubytování'},
						{value: 'haveDriver', displayValue: 'Ne, plánuji po oslavě odjet a mám vlastní odvoz'},
						{value: 'needDriver', displayValue: 'Ne, plánuji po oslavě odjet a potřebuji zajistit odvoz'}
					]
				},
				label: 'Ubytování a odjezd',
				value: 'accomodation',
				valid: true,
				show: false
			},
			foodRequirementTwo: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: ''
				},
				label: 'Alergie na potraviny',
				value: '',
				valid: true,
				show: false
			},
		},
		formIsValid: false,
		loading: false
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});
		const formData = {};
		for (let formElementIdentifier in this.state.guest) {
			formData[formElementIdentifier] = this.state.guest[formElementIdentifier].value;
		}
		console.log(formData);
		const guests = {
			guest: formData
		};
		axios.post('/guests.json', guests)
			.then(response => {
				this.setState({loading: false});
			})
			.catch(error => {
				this.setState({loading: false});
				console.log(error);
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
		const updatedOrderForm = {
			...this.state.guest
		};
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};
		if (inputIdentifier === 'plusOne') {
			updatedOrderForm['nameTwo'].show = !updatedOrderForm['nameTwo'].show;
			updatedOrderForm['accomodationTwo'].show = !updatedOrderForm['accomodationTwo'].show;
			updatedOrderForm['foodRequirementTwo'].show = !updatedOrderForm['foodRequirementTwo'].show;

			updatedOrderForm['nameTwo'].valid = !updatedOrderForm['nameTwo'].valid;

			updatedFormElement.elementConfig.checked = !updatedFormElement.elementConfig.checked;
		}

		if (inputIdentifier === 'car') {
			updatedOrderForm['nrOfSeats'].show = !updatedOrderForm['nrOfSeats'].show;

			updatedOrderForm['nrOfSeats'].valid = !updatedOrderForm['nrOfSeats'].valid;

			updatedFormElement.elementConfig.checked = !updatedFormElement.elementConfig.checked;
		}

		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({guest: updatedOrderForm, formIsValid: formIsValid});

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
					<Input
						show={formElement.config.show}
						label={formElement.config.label}
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>Uložit</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner/>;
		}
		return (
			<div className={classes.WeddingForm}>
				<h4>Vyplňte dotazník</h4>
				{form}
			</div>
		);
	}
}

export default WeddingForm;
