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
	
	switchToEditModeHandler = () => {
		this.setState({editMode: true});
	};
	
	editTextHandler = (text) => {
		this.setState({text, editMode: false});
		this.props.editTodo(text);
		
	};
	
	cancelEditTextHandler = () => {
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
				<Icon
					onClick={() => this.props.clicked(this.props.todoItem.id)}
				>
					{this.props.todoItem.done ? 'check_box' : 'check_box_outline_blank'}
				</Icon>
				<span>{this.props.todoItem.text}</span>
				<Icon
					style={{marginLeft: 'auto'}}
					onDragStart={this.props.onDragStart}
					draggable={true}
				>drag_indicator</Icon>
				<Icon
					onClick={this.switchToEditModeHandler}
					disabled={this.props.todoItem.done}
				>edit</Icon>
				<Icon onClick={() => this.props.deleteTodo(this.props.todoItem.id)}>delete</Icon>
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
						confirmEditButton={this.editTextHandler}
						declineEditButton={this.cancelEditTextHandler}/> :
					todoInsides
				}
			</ListElement>
		);
	}
}

export default TodoItem;