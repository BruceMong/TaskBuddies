import React, { useEffect, useState } from "react";
import GroupTaskTile from "./GroupTaskTile";
import GroupTagList from "../tag/GroupTagList";
import GroupTaskForm from "./GroupTaskForm"; // Importez GroupTaskForm

import jwt_decode from "jwt-decode";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { fetchGroupTasks, taskSliceActions } from "../../store/dashboard/task";

const GroupTaskList = ({ authorId, groupId }) => {
	const dispatch = useDispatch();
	const { groupTasks, status, error } = useSelector((state) => state.task);
	const selectedDateStr = useSelector((state) => state.task.selectedDate);
	const selectedDate = new Date(selectedDateStr);
	const selectedTags = useSelector((state) => state.task.selectedTags);

	const token = localStorage.getItem("token"); // Remplacez 'token' par la clé que vous utilisez pour stocker le token
	const decodedToken = jwt_decode(token);
	const currentUserId = decodedToken.id; // Remplacez 'userId' par la clé que vous utilisez pour stocker l'ID de l'utilisateur dans le token

	useEffect(() => {
		dispatch(fetchGroupTasks([groupId]));
	}, [dispatch, selectedTags, groupId, selectedDateStr]);

	const handleDateChange = (newDate) => {
		dispatch(taskSliceActions.setSelectedDate(newDate.toISOString()));
		dispatch(fetchGroupTasks([groupId])); // Utilisez un tableau pour passer l'ID du groupe
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

	const [showForm, setShowForm] = useState(false); // Ajoutez cet état

	const handleButtonClick = () => {
		setShowForm(true);
	};

	const handleBackClick = () => {
		setShowForm(false);
	};
	if (showForm) {
		return (
			<GroupTaskForm groupId={groupId} handleBackClick={handleBackClick} />
		);
	}

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Tâches de groupe à réaliser 💪</p>
				{currentUserId === authorId && (
					<button className="headerBtn" onClick={handleButtonClick}>
						<FontAwesomeIcon icon={faPlusCircle} />
					</button>
				)}
			</div>
			<GroupTagList groupId={groupId} />
			<div className="bodyContainer">
				{status === "loading" && <div>Chargement...</div>}
				{error && <div>Erreur : {error}</div>}

				{groupTasks[groupId]?.map(
					(
						task // Utilisez la notation de point d'interrogation pour vérifier si les tâches du groupe existent
					) => (
						<GroupTaskTile
							key={task.id}
							task={task}
							selectedDate={selectedDate}
							groupId={groupId}
						/>
					)
				)}
			</div>
		</div>
	);
};

export default GroupTaskList;
