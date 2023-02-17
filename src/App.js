import "./App.css";
import TaskList from "./Components/TaskList";
import { Button, Table } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TaskList />
      </header>
    </div>
  );
}

export default App;
