import React from "react";
import { Button, Table } from "react-bootstrap";

class TaskDynamic extends React.Component {
  render() {
    return (
      <tr>
        <th>Task: {this.props.title}</th>
        <th>Actions: {this.props.task}</th>
        <th>Priority: {this.props.priority}</th>
        <th>
          <Button
            variant="success"
            onClick={() => this.props.increase(this.props.id)}
          >
            +
          </Button>
          <Button
            variant="danger"
            onClick={() => this.props.decrease(this.props.id)}
          >
            -
          </Button>
        </th>
        <th>
          <Button
            variant="outline-danger"
            onClick={() => this.props.delete(this.props.id)}
          >
            Delete
          </Button>
        </th>
      </tr>
    );
  }
}

export default TaskDynamic;
