import { useEffect } from "react";
import TagTile from "./TagTile";

import { useSelector, useDispatch } from "react-redux";
import { fetchTagsByUser } from "../../store/dashboard/tag";
import { fetchTasks, taskSliceActions } from "../../store/dashboard/task"; // Import fetchTasks action

const TagList = ({ handleAction }) => {
	const dispatch = useDispatch();
	const { tags, status, error } = useSelector((state) => state.tag);
	const selectedTags = useSelector((state) => state.task.selectedTags); // Get selectedTags from the state

	// Utilisez useEffect pour déclencher le fetch des tâches lorsque le composant est monté.
	useEffect(() => {
		dispatch(fetchTagsByUser());
	}, [dispatch]);

	// Utilisez useEffect pour déclencher le fetch des tâches chaque fois que selectedTags change.
	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch, selectedTags]);

	return (
		<div className="tagsContainer">
			{status === "loading" && <div>Chargement...</div>}
			{error && <div>Erreur : {error}</div>}
			{tags.map((tag) => (
				<TagTile
					key={tag.id}
					tag={tag}
					onTagClick={handleAction}
					isActive={selectedTags.includes(tag.id)}
				/>
			))}
		</div>
	);
};

export default TagList;
