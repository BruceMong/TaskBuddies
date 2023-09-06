import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { groupService } from "../../services/groupService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const GroupUserListUpdate = () => {
	const { id } = useParams();
	const [users, setUsers] = useState([]);
	const [errorText, setErrorText] = useState("");

	useEffect(() => {
		groupService.fetchGroupById(id).then((group) => setUsers(group.users));
	}, [id]);

	console.log(users);

	const handleRemoveUser = async (userId) => {
		try {
			setErrorText("");
			await groupService.removeUserFromGroup(id, userId);
			setUsers(users.filter((user) => user.id !== userId));
		} catch (error) {
			console.error("Remove error:", error);
			setErrorText("Échec de la suppression de l'utilisateur");
		}
	};

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Mettre à jour la liste des utilisateurs du groupe</p>
			</div>
			<div className="bodyContainer">
				{users.map((user) => (
					<div key={user.id} className="tileContainer">
						<p>{user.username}</p>
						<button onClick={handleRemoveUser} className="headerBtn">
							<FontAwesomeIcon icon={faTrashAlt} />
						</button>
					</div>
				))}
				{errorText && <div className="errorText">{errorText}</div>}
			</div>
		</div>
	);
};

export default GroupUserListUpdate;
