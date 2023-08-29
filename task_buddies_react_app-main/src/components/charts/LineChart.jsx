import React, { useEffect, useState } from "react";

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

const LineChart = () => {

  const [randomData, setRandomData] = useState([]);

  useEffect(() => {
    // Générer des données aléatoires pour le graphique
    const data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setRandomData(data);
  }, []);


const options = {
  responsive: true,
  interaction: {
    mode: 'index' ,
    intersect: false,
  },
  stacked: false,
  scales: {
    y: {
      type: 'linear' ,
      display: true,
      position: 'left' ,
    },
    
  },
};
  const chartData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct"],
    datasets: [
      {
        label: "Données aléatoires",
        data: randomData,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };
  console.log(chartData)

  // Rendu du composant Line avec les options et les données définies
  return <Line options={options} data={chartData} />;
};

// Exportation du composant RandomLineChart
export default LineChart;
