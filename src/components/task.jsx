import React from 'react';
import './task.css';

export default class Task extends React.Component {
	render() {

    	const {
    		done, 
    		content,
			handleDeleteTask,
			handleTaskDone,
    	} = this.props;

    	const contentClass = done
    		? 'task-done'
    		: 'task-active';

		return (
			<div className='task'>
				<div className={contentClass} onClick={handleTaskDone}>{content}</div>
				<div className="delete-task-button" onClick={handleDeleteTask}>Delete Task</div>
			</div>
		)
	}
}

