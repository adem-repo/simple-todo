import React, {Component} from 'react';
import './App.css';

import TodoContainer from './components/TodoContainer/TodoContainer.js';
import TodoItem from "./components/TodoItem/TodoItem";
import Icon from '../src/UI/Icon/Icon';

class App extends Component {

	constructor(props) {
		super(props);

		const todos = [
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
		];

		this.state = {
			todos,
			prevTodosStates: [
				todos
			],
			currentStateIndex: 0
		}
	}

	updateState = ({todos}) => {
		const prevTodosStates = [...this.state.prevTodosStates];
		const currentStateIndex = this.state.currentStateIndex + 1;
		const slicedPrevTodosStates = prevTodosStates.slice(0, currentStateIndex);
		slicedPrevTodosStates.push(todos);
		this.setState({todos, prevTodosStates: slicedPrevTodosStates, currentStateIndex});
	};
	
	todoChangeHandler = (id) => {
		let todoIndex = this.state.todos.findIndex( todo => todo.id === id);
		let todo = {...this.state.todos[todoIndex]};
		let todos = [...this.state.todos];
		todo.done = !todo.done;
		todos[todoIndex] = todo;
		this.updateState({todos});
	};
	
	addTodoHandler = (newTodo) => {
		const todos = [...this.state.todos];
		todos.push(newTodo);
		this.updateState({todos});
	};
	
	deleteTodoHandler = (id) => {
		const todos = [...this.state.todos];
		const deleteTodoIndex = todos.findIndex( todo => todo.id === id);
		todos.splice(deleteTodoIndex, 1);
		this.updateState({todos});
	};
	
	editTodoHandler = (text, index) => {
		const todos = [...this.state.todos];
		const editedTodo = {...todos[index]};
		editedTodo.text = text;
		todos[index] = editedTodo;
		this.updateState({todos});
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
		this.updateState({ todos: items });
	};
	
	onDragEnd = (index) => {
		const todos = [...this.state.todos];
		todos[index].draggable = false;
		this.setState({todos});
	};

	undoHandler = () => {
		const { currentStateIndex, prevTodosStates } = this.state;

		if (currentStateIndex === 0)
			return;

		const newCurrentStateIndex = currentStateIndex - 1;

		this.setState({
			todos: prevTodosStates[newCurrentStateIndex],
			currentStateIndex: newCurrentStateIndex
		})
	};

	redoHandler = () => {
		const { currentStateIndex, prevTodosStates } = this.state;

		if (prevTodosStates.length - 1 === currentStateIndex)
			return;

		const newCurrentStateIndex = currentStateIndex + 1;

		this.setState({
			todos: prevTodosStates[newCurrentStateIndex],
			currentStateIndex: newCurrentStateIndex
		});

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
			<div className="app">
				<header className="header">
					<span>Simple TODO</span>
					<Icon
						style={{marginLeft: 'auto'}}
						onClick={this.undoHandler}
						disabled={this.state.currentStateIndex === 0}
					>undo</Icon>
					<Icon
						onClick={this.redoHandler}
						disabled={this.state.prevTodosStates.length - 1 === this.state.currentStateIndex}
					>redo</Icon>
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
