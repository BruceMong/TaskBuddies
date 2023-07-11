import React, { useEffect, useState } from "react";

import {taskService} from "../../services/taskService"; 

const TaskListUpdate = () => {

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
        <p>Tâches à réaliser 💪</p>
      </div>

      {tasks.map((task) => (
        {/* <div key={task.id} task={task} selectedDate={selectedDate} /> */}
      ))}
    </div>
  );
};

export default TaskListUpdate;
