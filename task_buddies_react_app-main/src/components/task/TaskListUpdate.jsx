import React, { useEffect, useState } from "react";

import { taskService } from "../../services/taskService";
import TaskTileUpdate from "../task/TaskTileUpdate"; 



const TaskListUpdate = ({ setTaskUpdated }) => {
  const [tasks, setTasks] = useState([]);

  // Utilisez useEffect pour déclencher le fetch des tâches lorsque le composant est monté.

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await taskService.fetchTasks();
      console.log(fetchedTasks);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="componentContainer">
      <div className="componentHeader">
        <p>Liste des tâches :</p>
      </div>

      {tasks.map((task) => (
        <TaskTileUpdate
          key={task.id}
          task={task}
          setTaskUpdated={setTaskUpdated}
        />
      ))}
    </div>
  );
};

export default TaskListUpdate;
