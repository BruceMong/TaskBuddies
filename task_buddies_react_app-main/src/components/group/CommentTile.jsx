import React from "react";

const CommentTile = ({ comment }) => {
	return (
		<div>
			<p>
				{comment.author.username} : {comment.content}
			</p>
		</div>
	);
};

export default CommentTile;
