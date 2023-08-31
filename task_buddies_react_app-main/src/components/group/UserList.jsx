import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountTaskUsersByGroupAndUserOnDateRange } from "../../store/dashboard/taskUser";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	BarElement,
} from "chart.js";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	BarElement
);

const UserList = ({ users, createdBy, groupId }) => {
	const dispatch = useDispatch();
	const countTaskUsersByUser = useSelector(
		(state) => state.taskUser.countTaskUsersByUser
	);

	// Définir les dates sur les 7 derniers jours
	const endDate = new Date();
	const startDate = new Date();
	startDate.setDate(endDate.getDate() - 7);

	useEffect(() => {
		users.forEach((user) => {
			dispatch(
				fetchCountTaskUsersByGroupAndUserOnDateRange({
					groupId,
					userId: user.id,
					startDate,
					endDate,
				})
			);
		});
	}, [dispatch, users, groupId, startDate, endDate]);

	// Créer les données pour le graphique
	const chartData = {
		labels: users.map((user) => user.username),
		datasets: [
			{
				label: "Nombre de tâches",
				data: users.map((user) => countTaskUsersByUser[user.id] || 0),
				backgroundColor:
					"#" + Math.floor(Math.random() * 16777215).toString(16),
			},
		],
	};

	return (
		<div
			className="componentContainer"
			style={{ width: "100%", height: "100%" }}
		>
			<div className="componentHeader">
				<p>Liste des utilisateurs :</p>
			</div>

			<div style={{ width: "100%", height: "100%" }}>
				<Bar
					data={chartData}
					options={{ responsive: true, maintainAspectRatio: false }}
				/>
			</div>
		</div>
	);
};

export default UserList;
