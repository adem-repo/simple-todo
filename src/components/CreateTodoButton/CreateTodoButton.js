import React, { Component } from 'react';

import EditButton from "../EditButton/EditButton";
import ListElement from '../../UI/ListElement/ListElement';
import Icon from '../../UI/Icon/Icon';
import { uuid } from '../../lib/uuid';

import './CreateTodoButton.css';

class CreateTodoButton extends Component {
	
	state = {
		inputMode: false,
		text: ''
	};
	
	inputRef = React.createRef();
	
	changeModeHandler = async () => {
		await this.setState({inputMode: true});
	};
	
	inputChangeHandler = (event) => {
		this.setState({text: event.target.value})
	};
	
	addTodoHandler = (text) => {
		if (!text)
			return;
		this.setState({
			text: '',
			inputMode: false,
		});
		this.props.addTodo({
			text,
			done: false,
			id: uuid()
		});
	};
	
	handleKeyPress = event => {
		if (event.key === 'Enter')
			this.addTodoHandler(event);
	};
	
	inputDeclineHandler = () => {
		this.setState({text: '', inputMode: false});
	};
	
	render() {
		
		let classNames = ['add-todo'];
		
		return (
			<ListElement classNames={classNames} clicked={this.changeModeHandler}>
				{ this.state.inputMode ?
					<EditButton
						confirmEditButton={this.addTodoHandler}
						declineEditButton={this.inputDeclineHandler}/> :
					<Icon clicked={this.changeModeHandler}>add_circle_outline</Icon>
				}
			</ListElement>
		);
	}
}

export default CreateTodoButton;