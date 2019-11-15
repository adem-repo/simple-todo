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
		props.clicked && props.clicked(event);
	};
	
	return (
		<i
			className={classNames.join(' ')}
			onClick={clickHandler}
			style={props.style}
			onDragStart={props.onDragStart}
			draggable
		>
			{props.children}
		</i>
	);
};

export default icon;