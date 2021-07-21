import React, { useState, useEffect } from "react";
import "./ProjectOverlay.css";
import {
  useSelectedProjectValue,
  useShowAddProjectValue,
  useTimeFilterValue,
  useShowQuickAddTaskValue,
} from "../../context";
import { useTasks, useGetAllTasks, useFilterTasks } from "../../firebase-hooks";
import Task from "../Sidebar/Projects/Task";
import { AiOutlinePlus } from "react-icons/ai";
import { useOpenSidebarValue } from "../../context";
import AddProject from "../../AddProject";

import moment from "moment";
import AddTaskMain from "../Sidebar/Projects/AddTaskMain/AddTaskMain";
import AddTaskMini from "../modals/AddTaskMini";
const ProjectOverlay = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { active, setActive } = useTimeFilterValue();
  const { tasks } = useTasks();
  const { openSidebar } = useOpenSidebarValue();
  const [showAddTask, setShowAddTask] = useState(false);
  const { showAddProject, setShowAddProject } = useShowAddProjectValue();
  const { allTasks } = useGetAllTasks();
  const { filteredTasks } = useFilterTasks();
  const { showQuickAddTask } = useShowQuickAddTaskValue();

  useEffect(() => {
    console.log(selectedProject);
    console.log(active);
  }, [selectedProject]);

  return (
    <>
      <div
        className={
          openSidebar
            ? "project-overlay-container"
            : "project-overlay-container-full"
        }
      >
        <div className="p-o-header">
          {active !== null
            ? active.charAt(0).toUpperCase() + active.slice(1)
            : active === null && selectedProject
            ? selectedProject.name
            : ""}
        </div>
        <div className="pO_task-list">
          <ul className="project-overlay__tasks">
            {tasks &&
              tasks.map((task) => (
                <li className="project-overlay-task" key={task.taskId}>
                  <Task task={task} />
                </li>
              ))}
          </ul>
        </div>

        {showAddTask ? (
          <AddTaskMain setShowAddTask={setShowAddTask} />
        ) : (
          <div
            className="pO-add-task"
            role="button"
            tabIndex={0}
            onClick={() => setShowAddTask(true)}
          >
            <span>
              <AiOutlinePlus className="pO-add-task-plus" />
              <p className="pO-add-task-name">Add Task</p>
            </span>
          </div>
        )}
      </div>
      {showAddProject && <AddProject />}
      {showQuickAddTask && <AddTaskMini />}
    </>
  );
};

export default ProjectOverlay;
