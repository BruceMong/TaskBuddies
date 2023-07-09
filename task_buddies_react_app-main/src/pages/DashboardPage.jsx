import React from "react";
import TaskList from "../components/task/TaskList";
import TaskForm from "../components/task/TaskForm";

const DashboardPage = () => {
	return (
		<div className="dashboardPage">
			<TaskList />
			<TaskForm />
		</div>
	);
};

export default DashboardPage;
