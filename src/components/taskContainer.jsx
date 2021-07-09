import React from 'react';
import Task from './task';
import './taskContainer.css';

export default class TaskContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			currentTask: [],
			showDone: false,

		};
	}

	handleCheck = event => {
		this.setState({showDone: event.target.checked})
	}

	handleTaskDone = id => {
		let newTasks = this.state.tasks.slice();
		newTasks[id][1] = !newTasks[id][1]
		this.setState({tasks: newTasks})
	}

	handleDeleteTask = id => {
		let newTasks = this.state.tasks.slice();
		newTasks.splice(id, 1)
		this.setState({tasks: newTasks})
	}

	handleInput = event => {
		this.setState({currentTask: event.target.value})
	}

	handleSubmit = event => {
    	event.preventDefault();
		const newTasks = this.state.tasks.slice()
		if (!this.state.currentTask[1] || !/\S/.test(this.state.currentTask) || this.state.tasks.length > 4) return;
		newTasks.push([this.state.currentTask, false])
		this.setState({tasks: newTasks})
		this.setState({currentTask: ''})
	}

	render() {
		
		if (!this.state.showDone) {
			return (
				<>				
					<div className="task-container" style={{height: `calc(122px + 134px * ${this.state.tasks.length}`}}>
						<form className="input-form" onSubmit={this.handleSubmit}> 
							<label className="input-check-label" >
								<input className="input-check" type="checkbox" onChange={this.handleCheck} checked={this.state.showDone} />
							Show Done
							</label>
							<input className="input-field" maxLength="75" value={this.state.currentTask} onChange={this.handleInput} placeholder="New Task"></input>
						</form>
						<div>
							{this.state.tasks.map((task, id) => {
								return (
									<Task
										done={task[1]} 
										key={id}
										taskNr={id} 
										content={task[0]}
										handleTaskDone={() => this.handleTaskDone(id)}
										handleDeleteTask={() => this.handleDeleteTask(id)}
									/>
								)
							})}	
						</div>
					</div>
				</>
			)
		}
		else {
			return (
				<>				
					<div className="task-container" style={{height: `calc(122px + 134px * ${this.state.tasks.filter((task) => {return task[1] === true}).length})`}}>
						<form className="input-form" onSubmit={this.handleSubmit}> 
							<label className="input-check-label">
								<input className="input-check" type="checkbox" onChange={this.handleCheck} checked={this.state.showDone} />
								Show Done
							</label>
							<input className="input-field" maxLength="75" readOnly={this.state.showDone} value={this.state.currentTask} onChange={this.handleInput} placeholder="Please uncheck!"></input>
						</form>
						<div>
							{this.state.tasks.filter((task) => {
								return (task[1]) === true;
									}).map((task, id) => {
										return (
											<Task
												done={task[1]} 
												key={id}
												taskNr={id} 
												content={task[0]}
												handleTaskDone={() => this.handleTaskDone(id)}
												handleDeleteTask={() => this.handleDeleteTask(id)}
											/>
										)
									})
								}
						</div>
					</div>
				</>
			)		}
	}
}