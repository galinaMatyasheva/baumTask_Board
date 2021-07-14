import React from "react";
import { DragSource } from "react-dnd";
import { Avatar, Badge, IconButton } from "@material-ui/core";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import CollectionsBookmarkOutlinedIcon from "@material-ui/icons/CollectionsBookmarkOutlined";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import FlagIcon from "@material-ui/icons/Flag";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { boxSource } from "../dragAndDrop";
import "./BoardTask.scss";

class BoardTask extends React.Component {
  render() {
    return this.props.connectDragSource(
      <div>
        <div
          className="task"
          key={`${this.props.index}`}
          id={`${this.props.index}`}
        >
          <IconButton
            style={{ backgroundColor: this.props.task.color }}
            onClick={(e) =>
              this.props.handleTaskExpandClick(e, `${this.props.task._id}`)
            }
          >
            {this.props.taskExpandedId == `${this.props.task._id}` ? (
              <ListOutlinedIcon />
            ) : (
              <CollectionsBookmarkOutlinedIcon />
            )}
          </IconButton>
          <div className="task-content">
            <div id={`${this.props.index}`} className="task-content-about">
              <p>{this.props.task.text}</p>
              <Avatar src={this.props.task.avatarUrl} alt="img" />
            </div>
            <div className="task-action">
              <Badge badgeContent={0} />
              <div className="task-action-icons">
                <EditIcon
                  onClick={(e) =>
                    this.props.onClickEditTask(e, `${this.props.task._id}`)
                  }
                />
                <FlagIcon />
                <ChatBubbleIcon />
                <AttachFileIcon />
                <DeleteIcon
                  onClick={(e) =>
                    this.props.handleClickDelete(e, `${this.props.task._id}`)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="task-more-info"
          style={{
            display:
              this.props.taskExpandedId == `${this.props.task._id}`
                ? "block"
                : "none",
          }}
        >
          <h3 style={{ backgroundColor: this.props.task.color }}>
            Task {this.props.task._id}
          </h3>
          <div className="task-more-info-content">
            <p>{this.props.task.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

BoardTask = DragSource("boardTask", boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(BoardTask);

export default BoardTask;
