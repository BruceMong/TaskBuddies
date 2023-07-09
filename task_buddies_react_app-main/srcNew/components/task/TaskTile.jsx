import React from "react";
import "../../styles/task.scss";

import {taskService} from  "../../services/taskService"

const TaskTile = ({ task }) => {

	console.log(task);
	const handleClick = async () =>{
		try {
			await taskService.confirmTask({ id:task.id });

		} catch (error) {
			console.error("Error during signup:", error);
		}
	}
	return (
		<div className="taskTileContainer">
			<p>{task.title}</p>
			<button onClick={()=> {handleClick()} }className="taskTileButton">✓</button>
		</div>
	);
};

export default TaskTile;
