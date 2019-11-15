import React, { Component } from 'react';

import ListElement from '../../UI/ListElement/ListElement';
import Icon from '../../UI/Icon/Icon';
import CreateTodoInput from './CreateTodoInput';
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
		this.inputRef.current.focus();
	};
	
	inputChangeHandler = (event) => {
		this.setState({text: event.target.value})
	};
	
	addTodoHandler = event => {
		event.stopPropagation();
		const text = this.state.text;
		if (!text)
			return;
		this.setState({text: '', inputMode: false});
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
	
	inputDeclineHandler = event => {
		event.stopPropagation();
		this.setState({text: '', inputMode: false});
	};
	
	render() {
		
		let classNames = ['add-todo'];
		
		const plus = <Icon clicked={this.changeModeHandler}>add_circle_outline</Icon>;
		const input = (
			<div className="input">
				<input
					type="text"
					onChange={this.inputChangeHandler}
					onKeyPress={this.handleKeyPress}
					value={this.state.text}
					placeholder='Your note here'
					ref={this.inputRef}
				/>
				<Icon
					className='icon-shift-left'
					clicked={this.addTodoHandler}
					disabled={!this.state.text}
				>
					check_circle_outline
				</Icon>
				<Icon clicked={this.inputDeclineHandler}>highlight_off</Icon>
			</div>
		);
		
		return (
			<ListElement classNames={classNames} clicked={this.changeModeHandler}>
				{ this.state.inputMode ? input : plus }
			</ListElement>
		);
	}
}

export default CreateTodoButton;