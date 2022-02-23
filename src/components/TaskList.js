import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../lib/store";
import Task from "./Task";

const TaskList = () => {
  const tasks = useSelector((state) => {
    const orderedTasks = [
      ...state.taskbox.tasks.filter((task) => task.state === "TASK_PINNED"),
      ...state.taskbox.tasks.filter((task) => task.state !== "TASK_PINNED"),
    ];

    const filteredTasks = orderedTasks.filter(
      (task) => task.state === "TASK_INBOX" || task.state === "TASK_PINNED"
    );

    return filteredTasks;
  });
  const status = useSelector((state) => state.taskbox.status);

  const dispatch = useDispatch;
  const pinTask = (value) =>
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_PINNED" }));
  const archiveTask = (value) =>
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED" }));

  const renderLoadingRows = (num = 1) => {
    const rows = [];
    const row = (key) => (
      <div key={key} className="loading-item">
        <span className="glow-checkbox" />
        <span className="glow-text">
          <span>Loading</span> <span>cool</span> <span>state</span>
        </span>
      </div>
    );
    for (let i = 0; i < num; i++) {
      rows.push(row(i));
    }
    return rows;
  };

  if (status === "loading") {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        {renderLoadingRows(6)}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items" data-testid="empty" key={"empty"}>
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items" data-testid="success" key={"success"}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(task) => pinTask(task)}
          onArchiveTask={(task) => archiveTask(task)}
        />
      ))}
    </div>
  );
};

export default TaskList;
