// TaskList.jsx
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { taskService } from "../../services/taskService";
import TaskTile from "./TaskTile";
import "../../styles/task.scss";

const TaskList = () => {
	const [tasks, setTasks] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());

	useEffect(() => {
		fetchTasks();
	}, [selectedDate]);

	const fetchTasks = async () => {
		try {
			const fetchedTasks = await taskService.fetchTasksByDate(selectedDate);
			const tasksWithValidation = await Promise.all(
				fetchedTasks.map(async (task) => {
					const validated = await taskService.hasTaskBeenValidatedOnDate(
						task.id,
						selectedDate
					);
					return { ...task, validated };
				})
			);
			setTasks(tasksWithValidation);
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Tâches à réaliser 💪</p>
			</div>
			<DatePicker
				selected={selectedDate}
				onChange={(date) => setSelectedDate(date)}
			/>

			{tasks.map((task) => (
				<TaskTile
					key={task.id}
					task={task}
					fetchTasks={fetchTasks}
					selectedDate={selectedDate}
				/>
			))}
		</div>
	);
};

export default TaskList;
