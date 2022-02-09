import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";

const TaskList = ({ loading, tasks, onPinTask, onArchiveTask }) => {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  const orderedTasks = [
    ...tasks.filter((task) => task.state === "TASK_PINNED"),
    ...tasks.filter((task) => task.state !== "TASK_PINNED"),
  ];

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

  if (loading) {
    return <div className="list-items">{renderLoadingRows(6)}</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items">
      {orderedTasks.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  onPinTask: PropTypes.func,
  onArchiveTask: PropTypes.func,
};

TaskList.defaultProps = {
  loading: false,
};

export default TaskList;