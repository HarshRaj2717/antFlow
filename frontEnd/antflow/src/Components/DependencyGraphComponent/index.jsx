import React from "react";
import DependencyGraph from "./DependencyGraph";

const DependencyGraphComponent = ({ promptRes }) => {
  //tasks format
  // const tasks = [
  //     { task_id: 1, task_name: "Project Planning", dependencies: [] },
  //     { task_id: 2, task_name: "Database Design", dependencies: [] },
  //     { task_id: 3, task_name: "Backend Development Setup", dependencies: [1, 2] },
  //     { task_id: 4, task_name: "User Authentication Development", dependencies: [3] },
  //     { task_id: 5, task_name: "Notes Model and API", dependencies: [4] },
  //     { task_id: 6, task_name: "Frontend Development", dependencies: [5] },
  //     { task_id: 7, task_name: "Testing and QA", dependencies: [6] },
  //     { task_id: 8, task_name: "Deployment", dependencies: [7] },
  //     { task_id: 9, task_name: "Documentation", dependencies: [8] }
  //   ];

  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    let task = [];
    promptRes.data.tasks.map((t) => {
      task.push({
        task_id: t.task_id,
        task_name: t.task_name,
        dependencies: t.dependencies,
      });
    });
    setTasks(task);
  }, []);

  return (
    <div>
      <DependencyGraph tasks={tasks} />
    </div>
  );
};

export default DependencyGraphComponent;
