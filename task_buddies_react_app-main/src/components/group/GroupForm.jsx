import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreatedGroups, createGroup } from "../../store/dashboard/group";

const GroupForm = () => {
	const dispatch = useDispatch();
	const { status, error } = useSelector((state) => state.group);
	const [groupName, setGroupName] = useState("");

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log("groupName", groupName);

		try {
			await dispatch(createGroup(groupName));
			dispatch(fetchCreatedGroups());
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
					<button type="submit" disabled={status === "loading"}>
						Créer
					</button>
				</div>
			</form>
			{status === "loading" && <p>Chargement...</p>}
			{error && <p>Erreur : {error}</p>}
		</div>
	);
};

export default GroupForm;
