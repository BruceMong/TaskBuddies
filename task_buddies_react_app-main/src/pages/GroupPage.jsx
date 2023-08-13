import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { groupService } from "../services/groupService";
import UserList from "../components/group/UserList";
import GroupTaskForm from "../components/group/GroupTaskForm";

const GroupPage = () => {
	const { id } = useParams();
	const [group, setGroup] = useState(null);

	useEffect(() => {
		groupService.fetchGroupById(id).then((group) => setGroup(group));
	}, [id]);

	if (!group) {
		return <div>Chargement...</div>;
	}

	return (
		<div>
			<h1>{group.name}</h1>
			<p>Code d'entrée : {group.entryCode}</p>
			<UserList users={group.users} createdBy={group.createdBy} />
			<GroupTaskForm groupId={id} />
		</div>
	);
};

export default GroupPage;
