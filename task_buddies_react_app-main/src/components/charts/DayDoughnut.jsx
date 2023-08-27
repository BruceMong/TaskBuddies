// Importation des dépendances nécessaires
import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskUsers } from "../../store/dashboard/taskUser";

// Enregistrement des éléments nécessaires pour ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

// Définition du composant DayDoughnut
const DayDoughnut = () => {
	// Utilisation du hook useDispatch pour dispatcher des actions
	const dispatch = useDispatch();

	// Utilisation du hook useEffect pour dispatcher l'action fetchTaskUsers au montage du composant
	useEffect(() => {
		dispatch(fetchTaskUsers());
	}, [dispatch]);

	// Utilisation du hook useSelector pour accéder à l'état du store Redux
	const { taskUsers } = useSelector((state) => state.taskUser);
	const { tasks, groupTasks } = useSelector((state) => state.task);

	// Vérification si taskUsers est un tableau, sinon on crée un tableau vide
	const taskUsersArray = Array.isArray(taskUsers) ? taskUsers : [];
	// Création d'un nouveau tableau contenant tous les utilisateurs de tâches
	const allTaskUsers = [...taskUsersArray];
	// Création d'un nouveau tableau contenant toutes les tâches
	const allTasks = [...tasks, ...Object.values(groupTasks).flat()];

	// Création d'un objet contenant le nombre de tâches par utilisateur
	const taskUserCounts = allTaskUsers.reduce((acc, taskUser) => {
		// Récupération du tag de la tâche
		const tag =
			taskUser.task.tags && taskUser.task.tags.length > 0
				? taskUser.task.tags[0].title
				: null;
		// Si le tag existe, on incrémente le compteur pour ce tag
		if (tag) {
			return { ...acc, [tag]: (acc[tag] || 0) + 1 };
		} else {
			// Sinon, on retourne l'accumulateur tel quel
			return acc;
		}
	}, {});

	// Création d'un tableau contenant les labels pour le graphique
	const labels = Object.keys(taskUserCounts);
	// Création d'un tableau contenant le nombre de tâches complétées pour chaque label
	const completedTasksData = labels.map((label) => taskUserCounts[label] || 0);
	// Calcul du nombre total de tâches complétées
	const completedTasksCount = completedTasksData.reduce((a, b) => a + b, 0);
	// Calcul du nombre de tâches restantes
	const remainingTasksCount = allTasks.length - completedTasksCount;

	// Création du tableau de données pour le graphique
	const data = [...completedTasksData, remainingTasksCount];
	// Définition des couleurs de fond pour le graphique
	const backgroundColor = [
		...labels.map((label) => {
			// Recherche de la tâche correspondant au label
			const task = allTasks.find(
				(task) =>
					task.tags && task.tags.length > 0 && task.tags[0].title === label
			);
			// Si la tâche existe et qu'elle a été complétée, on utilise la couleur du tag, sinon on utilise une couleur grise
			return task && taskUserCounts[label]
				? task.tags[0].color + "80"
				: "#80808080";
		}),
		"#80808080",
	];
	// Définition des couleurs de bordure pour le graphique
	const borderColor = [
		...labels.map((label) => {
			// Recherche de la tâche correspondant au label
			const task = allTasks.find(
				(task) =>
					task.tags && task.tags.length > 0 && task.tags[0].title === label
			);
			// Si la tâche existe et qu'elle a été complétée, on utilise la couleur du tag, sinon on utilise une couleur grise
			return task && taskUserCounts[label] ? task.tags[0].color : "#808080";
		}),
		"#808080",
	];
	// Ajout du label "À réaliser" aux labels existants
	const labelsWithRemaining = [...labels, "À réaliser"];

	// Création des données pour le graphique
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

	// Définition des options pour le graphique
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

	// Rendu du composant Doughnut avec les options et les données définies
	return <Doughnut options={chartOptions} data={chartData} />;
};

// Exportation du composant DayDoughnut
export default DayDoughnut;
