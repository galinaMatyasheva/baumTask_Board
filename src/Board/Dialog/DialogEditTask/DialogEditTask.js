import React from "react";
import {
  TextareaAutosize,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  MenuItem,
} from "@material-ui/core";

import "./DialogEditTask.scss";

class DialogEditTask extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.openEditDialog}
        onClose={this.props.handleEditTaskClose}
        className="dialog-edit"
      >
        <DialogTitle>{"Edit task"}</DialogTitle>
        <DialogContent>
          <DialogContentText className="dialogContentText">
            <label>Text:</label>
            <TextareaAutosize
              maxRows={4}
              type="text"
              value={
                this.props.editableTask ? this.props.editableTask.text : ""
              }
              maxLength="500"
              onChange={this.props.onHandleTaskTextChange}
            />
            <label>Color:</label>
            <Select
              value={
                this.props.editableTask ? this.props.editableTask.color : ""
              }
              onChange={this.props.handleChangeColorTask}
            >
              <MenuItem value={"#F66D81"}>Pink</MenuItem>
              <MenuItem value={"#8779D1"}>Purple</MenuItem>
              <MenuItem value={"#27ae60"}>Green</MenuItem>
              <MenuItem value={"#F5380E"}>Red</MenuItem>
              <MenuItem value={"#1976d2"}>Blue</MenuItem>
            </Select>
            <label>Avatar:</label>
            <Select
              value={
                this.props.editableTask ? this.props.editableTask.avatarUrl : ""
              }
              onChange={this.props.handleChangeAvatarUrlTask}
            >
              <MenuItem
                value={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCP0T1Ddeg3QEdC0twz4cbvO4pYGBEQLMQ6Q&usqp=CAU"
                }
              >
                Men
              </MenuItem>
              <MenuItem
                value={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIq7wCu23dyG0PzcB6ZNLdSmSGq4AVDZicnQ&usqp=CAU"
                }
              >
                fireCat
              </MenuItem>
              <MenuItem
                value={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvmVuqqMmZmTxjfClEMsMhR6Q5UnRt0Hugng&usqp=CAU"
                }
              >
                Girl
              </MenuItem>
              <MenuItem
                value={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd3CMwyQAR1BSCjlfllXzvrg6a4oolAe8qg&usqp=CAU"
                }
              >
                Cat
              </MenuItem>
              <MenuItem
                value={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROxjuZts8XIXvKWwTHMqOS2qVy7rQBSF8hyw&usqp=CAU"
                }
              >
                Сhick
              </MenuItem>
            </Select>
            <label>Status:</label>
            <Select
              value={
                this.props.editableTask ? this.props.editableTask.status : ""
              }
              onChange={this.props.handleChangeStatusTask}
            >
              <MenuItem value={"backlog"}>Backlog</MenuItem>
              <MenuItem value={"inProgress"}>In progress</MenuItem>
              <MenuItem value={"rewiew"}>Rewiew</MenuItem>
              <MenuItem value={"refactoring"}>Refactoring</MenuItem>
              <MenuItem value={"done"}>Done</MenuItem>
            </Select>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.editTaskDone}>Ok</Button>
          <Button onClick={this.props.handleEditTaskClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DialogEditTask;
