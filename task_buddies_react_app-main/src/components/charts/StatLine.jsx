// Importation des dépendances nécessaires
import React, { useEffect, useState } from "react";

import LineChart from "../charts/LineChart.jsx";



const StatLine = () => {
	const [timeframe, setTimeframe] = useState('week'); // 'week' ou 'month'


	//du coup il faut le modifier selon la date actuel et le timeframe choisie par l'user
	const labelOrdonee = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Tâches par {timeframe === 'week' ? 'semaine' : 'mois'} 📈</p>

			</div>
			<div className="bodyContainer">
				<select onChange={(e) => setTimeframe(e.target.value)} value={timeframe}>
					<option value="week">Par semaine</option>
					<option value="month">Par mois</option>
				</select>
				{/* <LineChart labelOrdonee={labelOrdonee} /> */}
			</div>
		</div>
	);
};

// Exportation du composant DayDoughnut
export default StatLine;
