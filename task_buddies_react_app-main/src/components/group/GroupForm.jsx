import React, { useState } from "react";
import { groupService } from "../../services/groupService";

const GroupForm = () => {
	const [groupName, setGroupName] = useState("");

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log("groupName", groupName);

		try {
			await groupService.createGroup(groupName);
		} catch (error) {
			console.error("Erreur lors de la création du groupe :", error);
		}
	};

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Créer un groupe 💡</p>
			</div>
			<form className="bodyContainer" onSubmit={handleFormSubmit}>
				<div className="inputContainer">
					<label htmlFor="groupName">Nom du groupe</label>
					<input
						type="text"
						id="groupName"
						value={groupName}
						onChange={(event) => setGroupName(event.target.value)}
						placeholder="Nom du groupe"
						required
					/>
				</div>
				<div className="inputContainer">
					<button type="submit">Créer</button>
				</div>
			</form>
		</div>
	);
};

export default GroupForm;
