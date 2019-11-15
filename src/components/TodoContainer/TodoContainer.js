import React from 'react';

import './TodoContainer.css';

import TodoItem from "../TodoItem/TodoItem";
import CreateTodoButton from '../CreateTodoButton/CreateTodoButton';

const todoContainer = props => {
	
	let doneTodos = [],
		undoneTodos = [];
	
	props.todos.forEach( (todo, idx) => {
		const todoElement = (
			<TodoItem
				key={todo.id}
				todoItem={todo}
				clicked={props.done}
				deleteTodo={props.deleteTodo}
				editTodo={text => props.editTodo(text, idx)}
				onDragStart={event => props.onDragStart(event, idx)}
				onDragOver={() => props.onDragOver(idx)}
				onDragEnd={() => props.onDragEnd(idx)}
			/>
		);
		todo.done ? doneTodos.push(todoElement) : undoneTodos.push(todoElement);
	});
	
	return (
		<div className="TodoContainer">
			<div className="TodoUndone">
				{undoneTodos}
				<CreateTodoButton addTodo={props.addTodo}/>
			</div>
			<div className="TodoDone">{doneTodos}</div>
		</div>
	);
};

export default todoContainer;