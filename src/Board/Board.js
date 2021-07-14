import React from "react";
import update from "immutability-helper";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Menu, MenuItem } from "@material-ui/core";

import BoardTask from "./BoardTask/BoardTask";
import BoardColumn from "./BoardColumn/BoardColumn";
import DialogEditTask from "./Dialog/DialogEditTask/DialogEditTask";
import DialogDeleteTask from "./Dialog/DialogDeleteTask/DialogDeleteTask";
import { tasks, labels, labelSet } from "./mockdata";
import "./Board.scss";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks,
      menuOpen: false,
      taskExpandedId: null,
      anchorEl: null,
      openEditDialog: false,
      editableTask: null,
      openConfirmationDeleteDialog: false,
      deletedTask: null,
    };
  }

  update = (id, status) => {
    const { tasks } = this.state;
    const task = tasks.find((task) => task._id === id);
    task.status = status;
    const taskIndex = tasks.indexOf(task);
    const newTasks = update(tasks, {
      [taskIndex]: { $set: task },
    });
    this.setState({ tasks: newTasks });
  };

  addTask = () => {
    const newTasks = this.state.tasks;
    newTasks.push({
      _id: newTasks.length + 1,
      status: "backlog",
      text: "New task text",
      color: "#F66D81"
    });

    this.setState({ task: [...newTasks] });
  };

  handleClickBurgerMenu = (event) => {
    this.setState({ menuOpen: true, anchorEl: event.currentTarget });
  };

  handleCloseBurgerMenu = () => {
    this.setState({ menuOpen: false, anchorEl: null });
  };

  deleteTask = (e) => {
    const newTasks = this.state.tasks.filter((el) => {
      return el._id != this.state.deletedTask;
    });
    this.setState({
      tasks: [...newTasks],
      openConfirmationDeleteDialog: false,
    });
  };

  onHandleTaskTextChange = (e) => {
    const copyTask = Object.assign({}, this.state.editableTask);
    copyTask.text = e.target.value;
    this.setState({ editableTask: copyTask });
  };

  editTaskDone = () => {
    const editableTask = this.state.editableTask;
    const editTask = this.state.tasks.find((task) => {
      return task._id == editableTask.id;
    });

    editTask.text = editableTask.text;
    editTask.color = editableTask.color;
    editTask.avatarUrl = editableTask.avatarUrl;
    editTask.status = editableTask.status;
    this.setState({ tasks: [...this.state.tasks], openEditDialog: false });
  };

  handleClickDelete = (e, taskId) => {
    this.setState({
      openConfirmationDeleteDialog: true,
      deletedTask: taskId,
    });
  };

  onClickEditTask = (e, taskId) => {
    const editTask = this.state.tasks.find((task) => {
      return task._id == taskId;
    });
    this.setState({
      openEditDialog: true,
      editableTask: {
        id: taskId,
        text: editTask.text,
        color: editTask.color,
        avatarUrl: editTask.avatarUrl,
        status: editTask.status,
      },
    });
  };

  handleEditTaskClose = () => {
    this.setState({ openEditDialog: false });
  };

  handleConfirmationDeleteTaskClose = () => {
    this.setState({ openConfirmationDeleteDialog: false });
  };

  handleTaskExpandClick = (event, taskId) => {
    if (this.state.taskExpandedId === taskId) {
      this.setState({ taskExpandedId: null });
    } else {
      this.setState({ taskExpandedId: taskId });
    }
  };

  handleChangeColorTask = (event) => {
    const copyTask = Object.assign({}, this.state.editableTask);
    copyTask.color = event.target.value;
    this.setState({ editableTask: copyTask });
  };

  handleChangeStatusTask = (event) => {
    const copyTask = Object.assign({}, this.state.editableTask);
    copyTask.status = event.target.value;
    this.setState({ editableTask: copyTask });
  };

  handleChangeAvatarUrlTask = (event) => {
    const copyTask = Object.assign({}, this.state.editableTask);
    copyTask.avatarUrl = event.target.value;
    this.setState({ editableTask: copyTask });
  };

  render() {
    const { tasks } = this.state;
    return (
      <main className="main">
        <header className="header">
          <img src="/img/logo.svg" alt="img" />
          <IconButton onClick={this.handleClickBurgerMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            keepMounted
            open={this.state.menuOpen}
            onClose={this.handleCloseBurgerMenu}
            anchorEl={this.state.anchorEl}
          >
            <MenuItem
              onClick={() => {
                this.addTask();
                this.setState({ menuOpen: false });
              }}
            >
              Add task to backlog
            </MenuItem>
          </Menu>
        </header>
        <section className="board">
          {labels.map((column, index) => (
            <BoardColumn
              tasks={tasks}
              column={column}
              status={column}
              key={`column-${index}`}
              taskExpandedId={this.state.taskExpandedId}
            >
              <div className="column">
                <div className="column-title">{labelSet[column]}</div>
                <div>
                  {tasks
                    .filter((task) => task.status === column)
                    .map((task, index) => (
                      <BoardTask
                        task={Object.assign({}, task)}
                        index={index}
                        id={task._id}
                        onDrop={this.update}
                        key={`task-${index}`}
                        taskExpandedId={this.state.taskExpandedId}
                        handleTaskExpandClick={this.handleTaskExpandClick}
                        onClickEditTask={this.onClickEditTask}
                        handleClickDelete={this.handleClickDelete}
                      />
                    ))}
                </div>
              </div>
            </BoardColumn>
          ))}
          <DialogEditTask
            onHandleTaskTextChange={this.onHandleTaskTextChange}
            openEditDialog={this.state.openEditDialog}
            handleEditTaskClose={this.handleEditTaskClose}
            editableTask={this.state.editableTask}
            handleChangeColorTask={this.handleChangeColorTask}
            editTaskDone={this.editTaskDone}
            handleChangeAvatarUrlTask={this.handleChangeAvatarUrlTask}
            handleChangeStatusTask={this.handleChangeStatusTask}
          />
          <DialogDeleteTask
            deleteTask={this.deleteTask}
            openConfirmationDeleteDialog={
              this.state.openConfirmationDeleteDialog
            }
            handleConfirmationDeleteTaskClose={
              this.handleConfirmationDeleteTaskClose
            }
          />
        </section>
      </main>
    );
  }
}

export default Board;
