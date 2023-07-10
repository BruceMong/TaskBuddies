import React from "react";
import TaskList from "../components/task/TaskList";
import TaskForm from "../components/task/TaskForm";
import TagForm from "../components/tag/TagForm";
import DayStat from "../components/task/DayStat";

const DashboardPage = () => {
	return (
		<div className="dashboardPage">
			<TaskList />
			<TaskForm />
			<DayStat />
			<TagForm />
		</div>
	);
};

export default DashboardPage;
