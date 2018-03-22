import React from 'react';
import { Input } from 'react-materialize';

const input = (props) => {
	let inputElement = null;

	switch (props.elementType) {
		case ('input'):
			inputElement = <Input
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}>
				{props.icon}
			</Input>;
			break;
		case ('textarea'):
			inputElement = <Input
				type='textarea'
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}/>;
			break;
		case ('select'):
			inputElement = (
				<Input
					type='select'
					value={props.value}
					icon="local_hotel"
					onChange={props.changed}>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</Input>
			);
			break;
		default:
			inputElement = <Input
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}/>;
	}

	let input = null;

	if (props.show) {
		input = (
			<div>
				{inputElement}
			</div>
		)
	}

	return input;

};

export default input;