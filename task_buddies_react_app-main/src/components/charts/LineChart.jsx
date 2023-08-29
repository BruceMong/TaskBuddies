
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ tagsData, abscisseDate, taskUsersArray }) => {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
    },
  };
  const getColorForTag = (tag) => {
    // Recherchez la tâche correspondante dans taskUsersArray
    const task = taskUsersArray.find(taskUser => taskUser.tags.title === tag);
    
    // Si la tâche a été trouvée, retournez la couleur
    if (task) {
      return task.tags.color;
    }
  
    // Si la tâche n'a pas été trouvée, retournez une couleur par défaut
    return "#000000"; // Noir par défaut
  };
  
  
  // Convertir les données des tags en datasets pour le graphique
  const datasets = Object.entries(tagsData).map(([tag, data]) => {
    const color = getColorForTag(tag); // Obtenir la couleur pour ce tag
    return {
      label: tag,
      data: data,
      borderColor: color,
      borderWidth: 2,
    };
  });
  const chartData = {
    labels: abscisseDate,
    datasets: datasets,
  };



  return <Line options={options} data={chartData} />;
};

export default LineChart;

