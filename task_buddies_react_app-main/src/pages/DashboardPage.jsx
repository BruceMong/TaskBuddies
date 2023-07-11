import React from "react";
import TaskList from "../components/task/TaskList";
import TaskForm from "../components/task/TaskForm";
import TagForm from "../components/tag/TagForm";
import DayStat from "../components/task/DayStat";
import TagList from "../components/tag/TagList";

const DashboardPage = () => {
	return (
		<div className="dashboardPage">
			<TaskList />
			<TaskForm />
			<DayStat />
			<TagForm />
			<TagList />
		</div>
	);
};

export default DashboardPage;
