import React from 'react';
import Icon from "../../UI/Icon/Icon";

const createTodoInput = props => {
	
	return (
		<div className="input">
			<input
				type="text"
				onChange={props.inputChangeHandler}
				onKeyPress={props.handleKeyPress}
				value={props.text}
				placeholder='Your note here'
				ref={props.inputRef}
			/>
			<Icon
				className='icon-shift-left'
				clicked={props.addTodoHandler}
				disabled={!props.text}
			>
				check_circle_outline
			</Icon>
			<Icon clicked={props.inputDeclineHandler}>highlight_off</Icon>
		</div>
	);
};

export default createTodoInput;