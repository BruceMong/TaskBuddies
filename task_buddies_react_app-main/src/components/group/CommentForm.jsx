import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { groupService } from "../../services/groupService";
import { fetchCommentsByTaskUser } from "../../store/dashboard/comment";

const CommentForm = ({ taskUserId }) => {
	const dispatch = useDispatch();
	const [content, setContent] = useState("");

	const handleContentChange = (event) => {
		setContent(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await groupService.createComment(taskUserId, content);
			dispatch(fetchCommentsByTaskUser(taskUserId));
			setContent("");
		} catch (error) {
			console.error("Erreur lors de la création du commentaire :", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Commentaire :
				<input type="text" value={content} onChange={handleContentChange} />
			</label>
			<input type="submit" value="Envoyer" />
		</form>
	);
};

export default CommentForm;
