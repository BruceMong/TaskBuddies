import React, { useEffect, useState } from "react";
import { groupService } from "../../services/groupService";

const GroupList = () => {
	const [userGroups, setUserGroups] = useState([]);
	const [createdGroups, setCreatedGroups] = useState([]);

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const fetchedUserGroups = await groupService.fetchUserGroups();
				setUserGroups(fetchedUserGroups);

				const fetchedCreatedGroups = await groupService.fetchCreatedGroups();
				setCreatedGroups(fetchedCreatedGroups);
			} catch (error) {
				console.error(error);
			}
		};

		fetchGroups();
	}, []);

	return (
		<div>
			<h2>Groupes auxquels j'appartiens</h2>
			{userGroups.map((group) => (
				<div key={group.id}>{group.name}</div>
			))}

			<h2>Groupes que j'ai créés</h2>
			{createdGroups.map((group) => (
				<div key={group.id}>{group.name}</div>
			))}
		</div>
	);
};

export default GroupList;
