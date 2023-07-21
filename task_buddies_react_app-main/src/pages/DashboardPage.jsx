import React from "react";
import TaskList from "../components/task/TaskList";
import TaskForm from "../components/task/TaskForm";
import TagForm from "../components/tag/TagForm";
import DayStat from "../components/task/DayStat";
import TagList from "../components/tag/TagList";
import GroupForm from "../components/group/GroupForm";
import GroupList from "../components/group/GroupList";

const DashboardPage = () => {
	return (
		<div className="dashboardPage">
			<TaskList />
			<TaskForm />
			<DayStat />
			<TagForm />
			<GroupForm />
			<GroupList />
		</div>
	);
};

export default DashboardPage;
