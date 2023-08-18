import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import TaskTile from "./TaskTile";
import TagList from "../tag/TagList";
import GroupTaskTile from "../group/GroupTaskTile";

import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, taskSliceActions } from "../../store/dashboard/task";
import { fetchGroupTasks } from "../../store/dashboard/task";
import { fetchUserGroups } from "../../store/dashboard/group";

const TaskList = () => {
	//const [tasks, setTasks] = useState([]);

	const dispatch = useDispatch();
	const { tasks, status, error } = useSelector((state) => state.task);
	const { groupTasks } = useSelector((state) => state.task);
	const { userGroups } = useSelector((state) => state.group);
	const selectedDateStr = useSelector((state) => state.task.selectedDate);
	const selectedDate = new Date(selectedDateStr);

	const selectedTags = useSelector((state) => state.task.selectedTags);

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch, selectedTags]);

	useEffect(() => {
		dispatch(fetchUserGroups());
	}, [dispatch]);

	// Utilisez useEffect pour déclencher le fetch des tâches lorsque le composant est monté.
	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);

	useEffect(() => {
		const groupIds = userGroups.map((group) => group.id);
		dispatch(fetchGroupTasks(groupIds));
	}, [dispatch, userGroups, selectedDateStr]); // Ajoutez selectedDateStr ici

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
				{userGroups.map(
					(group) =>
						groupTasks[group.id]?.length > 0 && (
							<div key={group.id}>
								<p>{group.name}</p>
								{groupTasks[group.id].map((task) => (
									<GroupTaskTile
										key={task.id}
										task={task}
										selectedDate={selectedDate}
										groupId={group.id}
									/>
								))}
							</div>
						)
				)}
			</div>
		</div>
	);
};

export default TaskList;
