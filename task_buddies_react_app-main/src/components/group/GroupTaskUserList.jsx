import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GroupTaskUserTile from "./GroupTaskUserTile";
import CommentTile from "./CommentTile";
import { fetchGroupTaskUsers } from "../../store/dashboard/taskUser";
import { fetchCommentsByTaskUser } from "../../store/dashboard/comment";

const GroupTaskUserList = ({ groupId }) => {
	const dispatch = useDispatch();
	const { groupTaskUsers, status, error } = useSelector(
		(state) => state.taskUser
	);

	useEffect(() => {
		dispatch(fetchGroupTaskUsers([groupId]));
	}, [dispatch, groupId]);

	const { comments } = useSelector((state) => ({
		comments: state.comment.comments,
	}));

	useEffect(() => {
		if (groupTaskUsers[groupId]) {
			groupTaskUsers[groupId].forEach((taskUser) => {
				dispatch(fetchCommentsByTaskUser(taskUser.id));
			});
		}
	}, [groupTaskUsers, dispatch, groupId]);

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Utilisateurs de tâches de groupe 💪</p>
			</div>
			<div className="bodyContainer">
				{status === "loading" && <div>Chargement...</div>}
				{error && <div>Erreur : {error}</div>}
				{groupTaskUsers[groupId]?.map((taskUser) => (
					<div key={taskUser.id}>
						<GroupTaskUserTile taskUser={taskUser} />
						{comments[taskUser.id]?.map((comment) => (
							<CommentTile
								key={comment.id}
								comment={comment}
								taskTitle={taskUser.title}
								tagColor={taskUser.tags.color}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default GroupTaskUserList;
