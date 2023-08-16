import React, { useEffect } from "react";
import GroupTaskTile from "./GroupTaskTile";
import TagList from "../tag/TagList";

import { useSelector, useDispatch } from "react-redux";
import { fetchGroupTasks, taskSliceActions } from "../../store/dashboard/task";

const GroupTaskList = ({ groupId }) => {
	const dispatch = useDispatch();
	const { groupTasks, status, error } = useSelector((state) => state.task);
	const selectedDateStr = useSelector((state) => state.task.selectedDate);
	const selectedDate = new Date(selectedDateStr);
	const selectedTags = useSelector((state) => state.task.selectedTags);

	useEffect(() => {
		dispatch(fetchGroupTasks(groupId));
	}, [dispatch, selectedTags, groupId]);

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
				<p>Tâches de groupe à réaliser 💪</p>
			</div>
			<TagList handleAction={handleTagClickFilter} />
			<div className="bodyContainer">
				{status === "loading" && <div>Chargement...</div>}
				{error && <div>Erreur : {error}</div>}

				{groupTasks.map((task) => (
					<GroupTaskTile
						key={task.id}
						task={task}
						selectedDate={selectedDate}
						groupId={groupId}
					/>
				))}
			</div>
		</div>
	);
};

export default GroupTaskList;
