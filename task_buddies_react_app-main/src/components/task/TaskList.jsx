import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import TaskTile from "./TaskTile";
import TagList from "../tag/TagList";

import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, taskSliceActions } from "../../store/dashboard/task";

const TaskList = () => {
	//const [tasks, setTasks] = useState([]);

	const dispatch = useDispatch();
	const { tasks, status, error } = useSelector((state) => state.task);
	const selectedDateStr = useSelector((state) => state.task.selectedDate);
	const selectedDate = new Date(selectedDateStr);
	console.log(selectedDate);

	const selectedTags = useSelector((state) => state.task.selectedTags);

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch, selectedTags]);

	// Utilisez useEffect pour déclencher le fetch des tâches lorsque le composant est monté.
	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);

	// Lorsque vous voulez modifier la date sélectionnée, convertissez la nouvelle Date en chaîne de caractères ISO.
	const handleDateChange = (newDate) => {
		dispatch(taskSliceActions.setSelectedDate(newDate.toISOString()));
	};

	const handleTagClickFilter = (tagId) => {
		let newSelectedTags;

		if (selectedTags.includes(tagId)) {
			newSelectedTags = selectedTags.filter((id) => id !== tagId);
		} else {
			newSelectedTags = [...selectedTags, tagId];
		}

		dispatch(taskSliceActions.setSelectedTags(newSelectedTags));
	};

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Tâches à réaliser 💪</p>
			</div>
			<TagList handleAction={handleTagClickFilter} />
			<div className="bodyContainer">
				{status === "loading" && <div>Chargement...</div>}
				{error && <div>Erreur : {error}</div>}

				{tasks.map((task) => (
					<TaskTile key={task.id} task={task} selectedDate={selectedDate} />
				))}
			</div>
		</div>
	);
};

export default TaskList;
