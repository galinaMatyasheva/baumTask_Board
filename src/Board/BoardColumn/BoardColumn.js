import React from "react";
import { DropTarget } from "react-dnd";

import { boxTarget } from "../dragAndDrop";

class BoardColumn extends React.Component {
  render() {
    return this.props.connectDropTarget(<div>{this.props.children}</div>);
  }
}

BoardColumn = DropTarget("boardTask", boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(BoardColumn);

export default BoardColumn;
