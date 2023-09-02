import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { groupService } from "../services/groupService";
import UserList from "../components/group/UserList";
import GroupTaskForm from "../components/group/GroupTaskForm";
import GroupTaskList from "../components/group/GroupTaskList";
import GroupTaskUserList from "../components/group/GroupTaskUserList";
import GroupTagForm from "../components/tag/GroupTagForm";
import "../styles/Dashboard.scss";

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
		<div className="dashboardPage">
			<div className="columnComponent">
				<h1>{group.name}</h1>
				<p>Code d'entrée : {group.entryCode}</p>
			</div>

			<div className="columnComponent">
				<GroupTaskList groupId={id} />
			</div>

			<div className="columnComponent">
				<GroupTaskUserList groupId={id} />
			</div>

			<div className="columnComponent">
				<UserList
					users={group.users}
					createdBy={group.createdBy}
					groupId={id}
				/>
			</div>

			{/* <GroupTaskForm groupId={id} />
			<GroupTagForm groupId={id} /> */}
		</div>
	);
};

export default GroupPage;
