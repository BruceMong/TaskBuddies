// Importation des dépendances nécessaires
import React, { useEffect, useState } from "react";

// import LineChart from "../charts/LineChart.jsx";

import { useDispatch, useSelector } from "react-redux";
import { fetchTaskUsersDateRange } from "../../store/dashboard/taskUser";

const StatLine = () => {
	const [timeframe, setTimeframe] = useState("week"); // 'week' ou 'month'

	const dispatch = useDispatch();
	const taskUsersLastWeek = useSelector(
		(state) => state.taskUser.taskUsersDateRange
	);

	const [abscisseDate, setAbscisseDate] = useState([]);

	useEffect(() => {
		const endDate = new Date();
		const startDate = new Date();
		startDate.setDate(endDate.getDate() - 7); // Définir la date de début à 7 jours avant la date de fin

		dispatch(fetchTaskUsersDateRange({ startDate, endDate }));

		// Créer le tableau abscisseDate
		const days = [];
		for (
			let d = new Date(startDate);
			d <= endDate;
			d.setDate(d.getDate() + 1)
		) {
			const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
			days.push(dayNames[d.getDay()]);
		}
		setAbscisseDate(days);
	}, [dispatch]);

	// Convertir l'objet en tableau
	const taskUsersArray = Object.values(taskUsersLastWeek);

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Tâches par {timeframe === "week" ? "semaine" : "mois"} 📈</p>
			</div>
			<div className="bodyContainer">
				<select
					onChange={(e) => setTimeframe(e.target.value)}
					value={timeframe}
				>
					<option value="week">Par semaine</option>
					<option value="month">Par mois</option>
				</select>
				{/* <LineChart  />  */}
			</div>
		</div>
	);
};

// Exportation du composant DayDoughnut
export default StatLine;
