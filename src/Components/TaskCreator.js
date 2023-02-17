import React from "react";
import { Button, Table, Form } from "react-bootstrap";

class TaskCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      task: "",
      priority: 0,
      id: this.props.taskArrayLength,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const task = this.state;
    this.props.addTask(task);

    this.setState({
      title: "",
      task: "",
      priority: 0,
      id: this.props.taskArrayLength,
    });
  };

  render() {
    return (
      <div>
        <form>
          <Form.Group>
            <Form.Label>New Task</Form.Label>
            <Form.Control
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Group>
        </form>
        <form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Actions to be taken</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="task"
              type="text"
              value={this.state.task}
              onChange={this.handleChange}
            />
            <Button as="input" type="submit" value="submit" />
          </Form.Group>
        </form>
      </div>
    );
  }
}

export default TaskCreator;
