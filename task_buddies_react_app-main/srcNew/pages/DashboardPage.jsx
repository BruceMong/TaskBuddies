import React from "react";
import TaskList from "../components/task/TaskList";
import TaskForm from "../components/task/TaskForm";

const DashboardPage = () => {
	return (
		<div>
			<h2>Dashboard</h2>
			<TaskList />
			<TaskForm />
		</div>
	);
};

export default DashboardPage;
