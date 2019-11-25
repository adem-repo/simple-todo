import React from 'react';

import CreateTodoButton from '../CreateTodoButton/CreateTodoButton';

import './TodoContainer.css';

const todoContainer = props => {
	return (
		<div>
			<div className="undone-todos">
				{props.undoneTodos}
				<CreateTodoButton addTodo={props.addTodo}/>
			</div>
			<div>{props.doneTodos}</div>
		</div>
	);
};

export default todoContainer;