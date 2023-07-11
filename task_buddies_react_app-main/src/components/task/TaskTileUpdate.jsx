import React, { useState } from "react";

import "../../styles/Dashboard.scss";
import { taskService } from "../../services/taskService";

import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../../store/dashboard/task";
import TaskFormUpdate from "./TaskFormUpdate";

const TaskTileUpdate = ({ task, setTaskUpdated }) => {
  const { id, title } = task;

  const handleValidate = () => {
    console.log(id);
    setTaskUpdated(task);
  };

  return (
    <div className={`taskTileContainer `} onClick={handleValidate}>
      <p>{title}</p>
      <button className="taskTileButton"></button>
    </div>
  );
};

export default TaskTileUpdate;
