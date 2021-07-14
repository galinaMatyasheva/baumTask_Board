import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Board from "./Board/Board";
import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <DndProvider backend={HTML5Backend}>
          <Board />
        </DndProvider>
      </div>
    );
  }
}

export default App;
