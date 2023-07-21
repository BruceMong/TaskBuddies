import React, { useEffect, useState } from "react";
import { groupService } from "../../services/groupService";

const GroupList = () => {
	const [groups, setGroups] = useState([]);
	const [status, setStatus] = useState("idle");
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchGroups = async () => {
			setStatus("loading");
			try {
				const fetchedGroups = await groupService.fetchGroupsByUser();
				setGroups(fetchedGroups);
				setStatus("succeeded");
			} catch (error) {
				setError(error);
				setStatus("failed");
			}
		};

		fetchGroups();
	}, []);

	if (status === "loading") {
		return <div>Chargement...</div>;
	}

	if (status === "failed") {
		return <div>Erreur : {error.message}</div>;
	}

	return (
		<div>
			<h2>Mes groupes</h2>
			{groups.map((group) => (
				<div key={group.id}>{group.name}</div>
			))}
		</div>
	);
};

export default GroupList;
