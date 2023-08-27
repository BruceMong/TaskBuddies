import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskUsers } from "../../store/dashboard/taskUser";

ChartJS.register(ArcElement, Tooltip, Legend);

const DayDoughnut = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTaskUsers());
	}, [dispatch]);

	const { taskUsers } = useSelector((state) => state.taskUser);
	const { tasks, groupTasks } = useSelector((state) => state.task);

	const taskUsersArray = Array.isArray(taskUsers) ? taskUsers : [];
	const allTaskUsers = [...taskUsersArray];
	const allTasks = [...tasks, ...Object.values(groupTasks).flat()];

	const taskUserCounts = allTaskUsers.reduce((acc, taskUser) => {
		const tag =
			taskUser.task.tags && taskUser.task.tags.length > 0
				? taskUser.task.tags[0].title
				: null;
		if (tag) {
			return { ...acc, [tag]: (acc[tag] || 0) + 1 };
		} else {
			return acc;
		}
	}, {});

	const labels = Object.keys(taskUserCounts);
	const completedTasksData = labels.map((label) => taskUserCounts[label] || 0);
	const completedTasksCount = completedTasksData.reduce((a, b) => a + b, 0);
	const remainingTasksCount = allTasks.length - completedTasksCount;

	const data = [...completedTasksData, remainingTasksCount];
	const backgroundColor = [
		...labels.map((label) => {
			const task = allTasks.find(
				(task) =>
					task.tags && task.tags.length > 0 && task.tags[0].title === label
			);
			return task && taskUserCounts[label]
				? task.tags[0].color + "80"
				: "#80808080";
		}),
		"#80808080",
	];
	const borderColor = [
		...labels.map((label) => {
			const task = allTasks.find(
				(task) =>
					task.tags && task.tags.length > 0 && task.tags[0].title === label
			);
			return task && taskUserCounts[label] ? task.tags[0].color : "#808080";
		}),
		"#808080",
	];
	const labelsWithRemaining = [...labels, "À réaliser"];

	const chartData = {
		labels: labelsWithRemaining,
		datasets: [
			{
				label: "# of Votes",
				data,
				backgroundColor,
				borderColor,
				borderWidth: 3,
			},
		],
	};

	const chartOptions = {
		tooltips: {
			enabled: false,
		},
		elements: {
			arc: {
				borderWidth: 1,
			},
		},
	};

	return <Doughnut options={chartOptions} data={chartData} />;
};

export default DayDoughnut;
