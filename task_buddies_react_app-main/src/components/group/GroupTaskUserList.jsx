import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GroupTaskUserTile from "./GroupTaskUserTile";
import { fetchGroupTaskUsers } from "../../store/dashboard/taskUser";

const GroupTaskUserList = ({ groupId }) => {
	const dispatch = useDispatch();
	const { groupTaskUsers, status, error } = useSelector(
		(state) => state.taskUser
	);
	const selectedTags = useSelector((state) => state.task.selectedTags);

	useEffect(() => {
		dispatch(fetchGroupTaskUsers([groupId]));
	}, [dispatch, groupId, selectedTags]);

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Utilisateurs de tâches de groupe 💪</p>
			</div>
			<div className="bodyContainer">
				{status === "loading" && <div>Chargement...</div>}
				{error && <div>Erreur : {error}</div>}
				{groupTaskUsers[groupId]?.map((taskUser) => (
					<GroupTaskUserTile key={taskUser.id} taskUser={taskUser} />
				))}
			</div>
		</div>
	);
};

export default GroupTaskUserList;
