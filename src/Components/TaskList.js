import React, { Fragment } from "react";
import TaskCreator from "./TaskCreator";
import { Button, Table, Form, Row, Container, Col } from "react-bootstrap";
import TaskReadOnly from "./TaskReadOnly";
import TaskEdit from "./TaskEdit";

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editContactId: null,

      search: "",

      tasksArray: [
        {
          id: 0,
          priority: 1,
          title: "Task 1",
          task: "Carry out Task 1",
        },
        {
          id: 1,
          priority: 0,
          title: "Task 2",
          task: "Carry out Task 2",
        },
      ],
      defaultTasks: [
        {
          id: 0,
          priority: 1,
          title: "Task 1",
          task: "Carry out Task 1",
        },
        {
          id: 1,
          priority: 0,
          title: "Task 2",
          task: "Carry out Task 2",
        },
      ],
    };
  }

  addTask = (task) => {
    console.log(task);
    let newArray = [...this.state.tasksArray, task];
    this.setState({
      tasksArray: newArray,
    });
  };

  increasePriority = (id) => {
    const index = this.state.tasksArray.findIndex((task) => task.id === id);
    const task = this.state.tasksArray.filter((task) => task.id === id)[0];
    task.priority += 1;
    const newArray = [...this.state.tasksArray];
    newArray.splice(index, 1, task);
    this.setState({ tasksArray: newArray });
  };

  decreasePriority = (id) => {
    const index = this.state.tasksArray.findIndex((task) => task.id === id);
    const task = this.state.tasksArray.filter((task) => task.id === id)[0];
    task.priority -= 1;
    const newArray = [...this.state.tasksArray];
    newArray.splice(index, 1, task);
    this.setState({ tasksArray: newArray });
  };

  handleEditClick = (id) => {
    const index = this.state.tasksArray.findIndex((task) => task.id === id);
    const task = this.state.tasksArray.filter((task) => task.id === id)[0];
    this.setState({ editContactId: id });
  };

  saveFormChange = (id) => {
    const newArray = [...this.state.tasksArray];
    newArray.splice(this.state.editContactId, 1, id);

    this.setState({
      tasksArray: newArray,
      editContactId: null,
    });
  };

  cancelFormChange = (id) => {
    this.setState({
      editContactId: null,
    });
  };

  deleteTask = (id) => {
    const index = this.state.tasksArray.findIndex((task) => task.id === id);
    const task = this.state.tasksArray.filter((task) => task.id === id)[0];
    task.priority -= 1;
    const newArray = [...this.state.tasksArray];
    newArray.splice(index, 1);
    this.setState({ tasksArray: newArray });
  };

  setData() {
    this.setState({ savedData: JSON.stringify(this.state.tasksArray) });
    localStorage.setItem(
      "List of Tasks",
      JSON.stringify(this.state.tasksArray)
    );
  }

  componentDidMount() {
    if (localStorage.getItem("List of Tasks") !== null) {
      this.getData();
    }
  }

  getData() {
    if (localStorage.getItem("List of Tasks") !== null) {
      let data = JSON.parse(localStorage.getItem("List of Tasks"));
      this.setState({ tasksArray: data });
    }
  }

  clearStorage() {
    if (
      window.confirm("Are you sure? This will reset the entire task list!") ===
      true
    ) {
      localStorage.removeItem("List of Tasks");
      this.setState({
        tasksArray: this.state.defaultTasks,
      });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const disableStatus = localStorage.getItem("List of Tasks") === null;
    const disableSave = this.state.tasksArray.length === 0;
    let sorted = this.state.tasksArray.sort((a, b) => b.priority - a.priority);
    return (
      <div>
        <Container>
          <h1>Task List</h1>
          <Button
            disabled={disableSave}
            variant="success"
            onClick={() => this.setData()}
          >
            Save Tasks
          </Button>
          <Button
            variant="info"
            onClick={() => this.getData()}
            disabled={disableStatus}
          >
            Load Tasks
          </Button>
          <Button
            variant="danger"
            onClick={() => this.clearStorage()}
            disabled={disableStatus}
          >
            Clear Tasks
          </Button>
          <TaskCreator
            addTask={this.addTask}
            taskArrayLength={this.state.tasksArray.length}
            key={this.state.tasksArray.length}
          />

          <form>
            <Form.Control
              onChange={this.handleChange}
              placeholder="Search Tasks"
              name="search"
            />
          </form>
          <form>
            <Table responsive striped bordered variant="primary">
              <thead>
                <tr className="headerTable">
                  <th>Task: </th>
                  <th>Actions: </th>
                  <th>Priority: </th>
                  <th>⬆️⬇️</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              {this.state.tasksArray && this.state.tasksArray.length > 0 ? (
                sorted
                  .filter((task) =>
                    task.title
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase())
                  )
                  .map((task) => (
                    <Fragment key={task.id}>
                      {this.state.editContactId === task.id ? (
                        //Ternary If Else to check if editContactID has been changed from null to match another task's ID, and if so, switches to TaskEdit.js
                        <TaskEdit
                          edit={this.handleEditClick}
                          save={this.saveFormChange}
                          cancel={this.cancelFormChange}
                          key={task.id}
                          keyID={task.id}
                          priorityID={task.priority}
                          {...task}
                          increase={this.increasePriority}
                          decrease={this.decreasePriority}
                          delete={this.deleteTask}
                        />
                      ) : (
                        <TaskReadOnly
                          key={task.id}
                          {...task}
                          increase={this.increasePriority}
                          decrease={this.decreasePriority}
                          delete={this.deleteTask}
                          edit={this.handleEditClick}
                        />
                      )}
                    </Fragment>
                  ))
              ) : (
                <Fragment>
                  <tbody variant="outline-success">
                    <tr>
                      <th colSpan={5}>
                        <h1 className="taskComplete">All Tasks completed!</h1>
                      </th>
                    </tr>
                  </tbody>
                </Fragment>
              )}
            </Table>
          </form>
        </Container>
      </div>
    );
  }
}
