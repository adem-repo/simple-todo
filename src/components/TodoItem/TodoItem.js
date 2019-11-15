import React, { Component, Fragment } from 'react';

import ListElement from '../../UI/ListElement/ListElement';
import Icon from '../../UI/Icon/Icon';

import './TodoItem.css';

class TodoItem extends Component {
	
	state = {
		editMode: false
	};
	
	editTodoHandler = () => {
		this.setState({editMode: true});
	};
	
	render() {
		
		let classNames = ['todo-item'];
		
		if (this.props.todoItem.done) {
			classNames.push('todo-item-done')
		}
		if (this.props.todoItem.draggable) {
			classNames.push('todo-item-draggable')
		}
		
		const todoInsides = (
			<Fragment>
				<Icon className="check-icon" clicked={() => this.props.clicked(this.props.todoItem.id)}/>
				<span>{this.props.todoItem.text}</span>
				<Icon style={{marginLeft: 'auto'}}
					  onDragStart={this.props.onDragStart}
				>drag_indicator</Icon>
				<Icon clicked={this.editTodoHandler}>edit</Icon>
				<Icon clicked={() => this.props.deleteTodo(this.props.todoItem.id)}>delete</Icon>
				{this.props.todoItem.done && <hr/>}
			</Fragment>
		);
		
		return (
			<ListElement
				classNames={classNames.join(' ')}
				clicked={() => this.props.clicked(this.props.todoItem.id)}
				onDragOver={this.props.onDragOver}
				onDragEnd={this.props.onDragEnd}
				draggable={true}
			>
				{todoInsides}
			</ListElement>
		);
		
	}
}

export default TodoItem;