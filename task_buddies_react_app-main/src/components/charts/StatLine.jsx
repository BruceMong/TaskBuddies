// Importation des dépendances nécessaires
import React, { useEffect, useState } from "react";


import LineChart from "./LineChart.jsx";


import { useDispatch, useSelector } from "react-redux";
import { fetchTaskUsersDateRange } from "../../store/dashboard/taskUser";

const StatLine = () => {
	const [timeframe, setTimeframe] = useState("week"); // 'week' ou 'month'

	const dispatch = useDispatch();
	const taskUsersLastWeek = useSelector(
		(state) => state.taskUser.taskUsersDateRange
	);

	const [abscisseDate, setAbscisseDate] = useState([]);

// ...
useEffect(() => {
	const endDate = new Date();
	let startDate = new Date();
	
	if (timeframe === 'week') {
	  startDate.setDate(endDate.getDate() - 7);
	} else if (timeframe === 'month') {
	  startDate.setDate(endDate.getDate() - 30);
	}
  
	dispatch(fetchTaskUsersDateRange({ startDate, endDate }));
  
	// Créer le tableau abscisseDate
	const days = [];
	for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
	  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
	  days.push(dayNames[d.getDay()]);
	}
	setAbscisseDate(days);
  
  }, [dispatch, timeframe]);
  // ...
  

	// Convertir l'objet en tableau
	const taskUsersArray = Object.values(taskUsersLastWeek);
	
	// ...
// Après avoir obtenu taskUsersArray
const tags = {};


// Initialiser les tableaux pour chaque tag avec des zéros
taskUsersArray.forEach(taskUser => {
  const { tags: { title } } = taskUser;
  if (!tags[title]) {
    tags[title] = Array(abscisseDate.length).fill(0);
  }
});

// Remplir les tableaux avec les données correspondantes
taskUsersArray.forEach(taskUser => {
	const { tags: { title }, doneAt } = taskUser;
	const doneAtDate = new Date(doneAt);
	
	// Extraire le jour de la date (1-7 pour Lundi-Dimanche)
	const dayOfWeek = doneAtDate.getDay() + 1;
	
	// Trouver l'index correspondant dans abscisseDate
	const dayIndex = abscisseDate.findIndex(day => dayOfWeek === abscisseDate.indexOf(day) + 1);
	
	//console.log(taskUser.title + " " + dayIndex + " " + doneAtDate + " " + dayOfWeek);
	
	if (dayIndex !== -1) {
	  tags[title][dayIndex] += 1;
	}
  });
  
console.log(tags)
console.log(abscisseDate)

// ...



	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Tâches par {timeframe === "week" ? "semaine" : "mois"} 📈</p>
			</div>

			<div className="bodyContainer antiMalefice" >
				<select onChange={(e) => setTimeframe(e.target.value)} value={timeframe}>
					<option value="week">Par semaine</option>
					<option value="month">Par mois</option>
				</select>
				<LineChart tagsData={tags} abscisseDate={abscisseDate} taskUsersArray={taskUsersArray} />


			</div>
		</div>
	);
};

// Exportation du composant DayDoughnut
export default StatLine;
