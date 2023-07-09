import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { taskService } from "../../services/taskService";
import TaskTile from "./TaskTile";

const TaskList = () => {
	const [tasks, setTasks] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const token = localStorage.getItem("token");

	useEffect(() => {
		fetchTasks();
	}, [selectedDate]);

	const fetchTasks = async () => {
		try {
			const fetchedTasks = await taskService.fetchTasksByDate(
				selectedDate,
				token
			);
			setTasks(fetchedTasks);
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	return (
		<div>
			<h2>Task List</h2>
			<DatePicker
				selected={selectedDate}
				onChange={(date) => setSelectedDate(date)}
			/>

			{tasks.map((task) => (
				<TaskTile key={task._id} task={task} />
			))}
		</div>
	);
};

export default TaskList;
