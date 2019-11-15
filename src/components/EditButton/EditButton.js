import React, {Component} from 'react';
import Icon from "../../UI/Icon/Icon";
import PropTypes from 'prop-types';

import './EditButton.css';

class EditButton extends Component {
	
	state = {
		text: this.props.text || ''
	};
	
	inputRef = React.createRef();

	inputChangeHandler = (event) => {
		this.setState({text: event.target.value})
	};
	
	addTodoHandler = event => {
		event.stopPropagation();
		const text = this.state.text;
		if (!text)
			return;
		this.setState({text: ''});
		this.props.confirmEditButton(text);
	};
	
	handleKeyPress = event => {
		if (event.key === 'Enter')
			this.addTodoHandler(event);
	};
	
	inputDeclineHandler = event => {
		event.stopPropagation();
		this.setState({text: ''});
		this.props.declineEditButton();
	};
	
	componentDidMount() {
		this.inputRef.current.focus();
	};
	
	render() {
		
		let classNames = ['edit-todo'];
		
		return (
			<div className={classNames} onClick={event => event.stopPropagation()}>
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
			</div>
		);
	}
}

EditButton.propTypes = {
	text: PropTypes.string,
	confirmEditButton: PropTypes.func.isRequired,
	declineEditButton: PropTypes.func.isRequired
};

export default EditButton;