import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskTile from "./TaskTile";

import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, taskSliceActions } from "../../store/dashboard/task"; 

const TaskList = () => {
  //const [tasks, setTasks] = useState([]);

  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.task);
  const selectedDateStr = useSelector((state) => state.task.selectedDate);
  const selectedDate = new Date(selectedDateStr);
  console.log(selectedDate);

  // Utilisez useEffect pour déclencher le fetch des tâches lorsque le composant est monté.
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Lorsque vous voulez modifier la date sélectionnée, convertissez la nouvelle Date en chaîne de caractères ISO.
  const handleDateChange = (newDate) => {
    dispatch(taskSliceActions.setSelectedDate(newDate.toISOString()));
    dispatch(fetchTasks());

  };


/*   const fetchTasks = async () => {
		try {
			const fetchedTasks = await taskService.fetchTasksByDate(selectedDate);
			const tasksWithValidation = await Promise.all(
				fetchedTasks.map(async (task) => {
					const validated = await taskService.hasTaskBeenValidatedOnDate(
						task.id,
						selectedDate
					);
					return { ...task, validated };
				}) */

  return (
    <div className="componentContainer">
      <div className="componentHeader">
        <p>Tâches à réaliser 💪</p>
      </div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />
      {status === "loading" && <div>Chargement...</div>}
      {error && <div>Erreur : {error}</div>}

      {tasks.map((task) => (
        <TaskTile
          key={task.id}
          task={task}
          selectedDate={selectedDate}
        />
      ))}
    </div>
  );

};

export default TaskList;
