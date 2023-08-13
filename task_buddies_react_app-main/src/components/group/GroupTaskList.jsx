// // src/components/task/GroupTaskList.jsx
// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchTasksByGroup } from "../../store/dashboard/task";
// import TaskTile from "../task/TaskTile";

// const GroupTaskList = ({ groupId }) => {
// 	const dispatch = useDispatch();
// 	const { tasks, status, error } = useSelector((state) => state.task);

// 	useEffect(() => {
// 		dispatch(fetchTasksByGroup(groupId));
// 	}, [dispatch, groupId]);

// 	return (
// 		<div className="componentContainer">
// 			<div className="componentHeader">
// 				<p>Tâches à réaliser 💪</p>
// 			</div>
// 			<div className="bodyContainer">
// 				{status === "loading" && <div>Chargement...</div>}
// 				{error && <div>Erreur : {error}</div>}
// 				{tasks.map((task) => (
// 					<TaskTile key={task.id} task={task} />
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default GroupTaskList;
