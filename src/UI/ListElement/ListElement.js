import React from 'react';
import './ListElement.css';

const listElement = props => {
	
	let classNames = ['list-item', props.classNames].join(' ');
	
	return (
		<div
			className={classNames}
			onClick={props.clicked}
			onDragOver={props.onDragOver}
			onDragEnd={props.onDragEnd}
		>
			{props.children}
		</div>
	);
};

export default listElement;