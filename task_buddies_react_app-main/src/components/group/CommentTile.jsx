// CommentTile.jsx
import React from "react";

const CommentTile = ({ comment, taskTitle, tagColor }) => {
	return (
		<div key={comment.id}>
			<p>{comment.author.username + " : " + comment.content}</p>
			<small style={{ color: tagColor }}>{taskTitle}</small>
		</div>
	);
};

export default CommentTile;
