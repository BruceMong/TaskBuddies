// Importation des dépendances nécessaires
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
//import { fetchWeeklyTasks } from "../../store/dashboard/weeklyTasks"; // Remplacez par votre propre action Redux

// Enregistrement des éléments nécessaires pour ChartJS
// (Si vous avez déjà enregistré ces éléments dans un autre fichier, vous pouvez ignorer cette étape)
import { Chart as ChartJS, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, Tooltip, Legend);


const LineChart = ({ labelOrdonee }) => {
	const weeklyTasks = [
		{
		  id: 1,
		  date: '2023-08-21', // Lundi
		  tags: [{ title: 'Travail', color: '#FF5733' }],
		},
		{
		  id: 2,
		  date: '2023-08-21', // Lundi
		  tags: [{ title: 'Personnel', color: '#33FF57' }],
		},
		{
		  id: 3,
		  date: '2023-08-22', // Mardi
		  tags: [{ title: 'Travail', color: '#FF5733' }],
		},
		{
		  id: 4,
		  date: '2023-08-23', // Mercredi
		  tags: [{ title: 'Travail', color: '#FF5733' }],
		},
		{
		  id: 5,
		  date: '2023-08-23', // Mercredi
		  tags: [{ title: 'Personnel', color: '#33FF57' }],
		},
		{
		  id: 6,
		  date: '2023-08-24', // Jeudi
		  tags: [{ title: 'Personnel', color: '#33FF57' }],
		},
		{
		  id: 7,
		  date: '2023-08-25', // Vendredi
		  tags: [{ title: 'Travail', color: '#FF5733' }],
		},
		{
		  id: 8,
		  date: '2023-08-26', // Samedi
		  tags: [{ title: 'Personnel', color: '#33FF57' }],
		},
		{
		  id: 9,
		  date: '2023-08-27', // Dimanche
		  tags: [{ title: 'Personnel', color: '#33FF57' }],
		},
	  ];
	  
	  
  const dispatch = useDispatch();

  useEffect(() => {
   // dispatch(fetchWeeklyTasks()); // Remplacez par votre propre action Redux
  }, [dispatch]);

  // Utilisation du hook useSelector pour accéder à l'état du store Redux
 // const { weeklyTasks } = useSelector((state) => state.weeklyTasks); // Remplacez par votre propre sélecteur Redux

  // Initialisation des données
  const taskCountsByDay = {};

  // Remplissage des données
  weeklyTasks.forEach((task) => {
    const day = new Date(task.date).getDay();
    const tag = task.tags && task.tags.length > 0 ? task.tags[0].title : "Sans tag";
    taskCountsByDay[tag] = taskCountsByDay[tag] || Array(7).fill(0);
    taskCountsByDay[tag][day]++;
  });

  // Création des données pour le graphique
  const chartData = {
    labels: labelOrdonee,
    datasets: Object.keys(taskCountsByDay).map((tag, index) => ({
      label: tag,
      data: taskCountsByDay[tag],
      fill: false,
      borderColor: `hsl(${index * 45}, 70%, 50%)`,
      tension: 0.1,
    })),
  };

  // Rendu du composant Line avec les options et les données définies
  return (
        <Line data={chartData} key={Math.random().toString(36).substring(7)}/>
  );
};

// Exportation du composant WeekLineChart
export default LineChart;
