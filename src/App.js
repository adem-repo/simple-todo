import React, {Component} from 'react';
import './App.css';

import TodoContainer from './components/TodoContainer/TodoContainer.js';
import TodoItem from "./components/TodoItem/TodoItem";

class App extends Component {
	
	state = {
		todos: [
			{
				id: 'sdf',
				text: 'Bananas',
				done: false,
				draggable: false
			},
			{
				id: 'sdf2',
				text: 'Chicken',
				done: false,
				draggable: false
			},
			{
				id: 'sdf25',
				text: 'Bread',
				done: true,
				draggable: false
			},
			{
				id: 'sdf5',
				text: 'Oranges',
				done: false,
				draggable: false
			},
		]
	};
	
	todoChangeHandler = (id) => {
		let todoIndex = this.state.todos.findIndex( todo => todo.id === id);
		let todo = {...this.state.todos[todoIndex]};
		let todos = [...this.state.todos];
		todo.done = !todo.done;
		todos[todoIndex] = todo;
		this.setState({todos});
	};
	
	addTodoHandler = (newTodo) => {
		const todos = [...this.state.todos];
		todos.push(newTodo);
		this.setState({todos});
	};
	
	deleteTodoHandler = (id) => {
		const todos = [...this.state.todos];
		const deleteTodoIndex = todos.findIndex( todo => todo.id === id);
		todos.splice(deleteTodoIndex, 1);
		this.setState({todos})
	};
	
	editTodoHandler = (text, index) => {
		const todos = [...this.state.todos];
		const editedTodo = {...todos[index]};
		editedTodo.text = text;
		todos[index] = editedTodo;
		this.setState({todos});
	};
	
	onDragStart = (e, index) => {
		this.draggedItem = this.state.todos[index];
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/html", e.target.parentNode);
		e.dataTransfer.setDragImage(e.target.parentNode, 500, 20);
		
		const todos = [...this.state.todos];
		todos[index].draggable = true;
		this.setState({todos});
	};
	
	onDragOver = index => {
		const draggedOverItem = this.state.todos[index];

		if (this.draggedItem === draggedOverItem) {
			return;
		}

		let items = this.state.todos.filter(item => item !== this.draggedItem);
		items.splice(index, 0, this.draggedItem);
		this.setState({ todos: items });
	};
	
	onDragEnd = (index) => {
		const todos = [...this.state.todos];
		todos[index].draggable = false;
		this.setState({todos});
	};
	
	render() {

		let doneTodos = [],
			undoneTodos = [];

		this.state.todos.forEach( (todo, idx) => {
			const todoElement = (
				<TodoItem
					key={todo.id}
					todoItem={todo}
					clicked={this.todoChangeHandler}
					deleteTodo={this.deleteTodoHandler}
					editTodo={text => this.editTodoHandler(text, idx)}
					onDragStart={event => this.onDragStart(event, idx)}
					onDragOver={() => this.onDragOver(idx)}
					onDragEnd={() => this.onDragEnd(idx)}
				/>
			);
			todo.done ? doneTodos.push(todoElement) : undoneTodos.push(todoElement);
		});
		
		return (
			<div className="App">
				<header className="App-header">
					<span>Simple TODO</span>
				</header>
				<TodoContainer
					addTodo={this.addTodoHandler}
					doneTodos={doneTodos}
					undoneTodos={undoneTodos}
				/>
			</div>
		)
	}
}

export default App;
