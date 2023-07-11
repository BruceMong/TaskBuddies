import React, { useEffect, useState } from "react";

import TaskListUpdate from "../components/task/TaskListUpdate";
import TaskFormUpdate from "../components/task/TaskFormUpdate";

const ProfilPage = () => {
  const [taskUpdated, setTaskUpdated] = useState(null);

  return (
    <div className="ProfilPage">
      <TaskListUpdate setTaskUpdated={setTaskUpdated} />
      {taskUpdated && <TaskFormUpdate currentTask={taskUpdated} />}
    </div>
  );
};

export default ProfilPage;
