import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TaskTileUpdate from "../task/TaskTileUpdate";
import { fetchAllPersonnalTasks } from "../../store/dashboard/task"; // Importez l'action fetchAllPersonnalTasks

const TaskListUpdate = ({ setTaskUpdated }) => {
	const dispatch = useDispatch(); // Utilisez useDispatch pour créer une fonction dispatch

	// Utilisez useSelector pour accéder aux tâches dans le state de Redux
	const tasks = useSelector((state) => state.task.personnalTasks);

	useEffect(() => {
		dispatch(fetchAllPersonnalTasks()); // Dispatchez l'action fetchAllPersonnalTasks lorsque le composant est monté
	}, [dispatch]);

	console.log(tasks);

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Liste des tâches :</p>
			</div>

			{tasks.map((task) => (
				<TaskTileUpdate
					key={task.id}
					task={task}
					setTaskUpdated={setTaskUpdated}
				/>
			))}
		</div>
	);
};

export default TaskListUpdate;
