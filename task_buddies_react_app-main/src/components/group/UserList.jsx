import React from "react";

const UserList = ({ users, createdBy }) => {
	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Liste des utilisateurs :</p>
			</div>

			{users.map((user) => (
				<div
					key={user.id}
					style={{ color: user.id === createdBy.id ? "red" : "black" }}
				>
					{user.username}
				</div>
			))}
		</div>
	);
};

export default UserList;
