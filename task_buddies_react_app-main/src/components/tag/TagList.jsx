import { useEffect } from "react";
import TagTile from "./TagTile";

import { useSelector, useDispatch } from "react-redux";
import { fetchTagsByUser } from "../../store/dashboard/tag";
import { fetchTasks, taskSliceActions } from "../../store/dashboard/task"; // Import fetchTasks action

const TagList = () => {
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

	const handleTagClick = (tagId) => {
		let newSelectedTags;

		if (selectedTags.includes(tagId)) {
			newSelectedTags = selectedTags.filter((id) => id !== tagId);
		} else {
			newSelectedTags = [...selectedTags, tagId];
		}

		dispatch(taskSliceActions.setSelectedTags(newSelectedTags));
	};

	return (
		<div className="tagsContainer">
			{status === "loading" && <div>Chargement...</div>}
			{error && <div>Erreur : {error}</div>}
			{tags.map((tag) => (
				<TagTile
					key={tag.id}
					tag={tag}
					onTagClick={handleTagClick}
					isActive={selectedTags.includes(tag.id)}
				/>
			))}
		</div>
	);
};

export default TagList;
