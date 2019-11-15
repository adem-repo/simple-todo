import React, { Component, Fragment } from 'react';

import ListElement from '../../UI/ListElement/ListElement';
import Icon from '../../UI/Icon/Icon';

import './TodoItem.css';
import EditButton from "../EditButton/EditButton";

class TodoItem extends Component {
	
	state = {
		text: this.props.todoItem.text,
		editMode: false
	};
	
	editTodoHandler = () => {
		this.setState({editMode: true});
	};
	
	onEditText = (text) => {
		this.setState({text, editMode: false});
		this.props.editTodo(text);
		
	};
	
	onCancelEditText = () => {
		this.setState({editMode: false})
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
				<Icon
					style={{marginLeft: 'auto'}}
					onDragStart={this.props.onDragStart}
					disabled={this.props.todoItem.done}
				>drag_indicator</Icon>
				<Icon
					clicked={this.editTodoHandler}
					disabled={this.props.todoItem.done}
				>edit</Icon>
				<Icon clicked={() => this.props.deleteTodo(this.props.todoItem.id)}>delete</Icon>
				{this.props.todoItem.done && <hr onClick={event => event.stopPropagation()}/>}
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
				{
					this.state.editMode ?
					<EditButton
						text={this.state.text}
						confirmEditButton={this.onEditText}
						declineEditButton={this.onCancelEditText}/> :
					todoInsides
				}
			</ListElement>
		);
		
	}
}

export default TodoItem;