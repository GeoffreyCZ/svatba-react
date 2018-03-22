import React from 'react';

import { Button } from 'react-materialize';

const button = (props) => (
	<Button
		disabled={props.disabled}
		onClick={props.clicked}>{props.children}</Button>
);

export default button;