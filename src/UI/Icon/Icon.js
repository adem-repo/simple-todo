import React from 'react';

import './Icon.css';

const icon = props => {
	
	const classNames = ['icon', 'material-icons', props.className];

	if (props.disabled)
		classNames.push('disabled');

	let clickHandler = event => {
		event.stopPropagation();
		if (props.disabled)
			return;
		props.onClick && props.onClick(event);
	};
	
	return (
		<i
			{...props}
			onClick={clickHandler}
			className={classNames.join(' ')}
		>
			{props.children}
		</i>
	);
};

export default icon;