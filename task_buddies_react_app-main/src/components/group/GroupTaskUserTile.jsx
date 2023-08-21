import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CommentForm from "./CommentForm";
import { fetchCommentsByTaskUser } from "../../store/dashboard/comment";

const GroupTaskUserTile = ({ taskUser }) => {
	const dispatch = useDispatch();
	const doneAt = new Date(taskUser.doneAt);
	const [showCommentForm, setShowCommentForm] = useState(false);

	useEffect(() => {
		dispatch(fetchCommentsByTaskUser(taskUser.id));
	}, [dispatch, taskUser.id]);

	const handleCommentButtonClick = () => {
		setShowCommentForm(!showCommentForm);
	};

	return (
		<div>
			{taskUser.user.username} a réalisé {taskUser.task.title} à{" "}
			{doneAt.getHours()}:{doneAt.getMinutes()}
			<button onClick={handleCommentButtonClick}>Commenter</button>
			{showCommentForm && <CommentForm taskUserId={taskUser.id} />}
		</div>
	);
};

export default GroupTaskUserTile;
