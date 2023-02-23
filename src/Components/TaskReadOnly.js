import React, { Fragment } from "react";
import { Button } from "react-bootstrap";

class TaskReadOnly extends React.Component {
  render() {
    return (
      <Fragment>
        <tbody>
          <tr>
            <th>{this.props.title}</th>
            <th>{this.props.task}</th>
            <th>{this.props.priority}</th>
            <th>
              <Button
                size="sm"
                variant="success"
                onClick={() => this.props.increase(this.props.id)}
              >
                ➕
              </Button>

              <Button
                size="sm"
                variant="danger"
                onClick={() => this.props.decrease(this.props.id)}
              >
                ➖
              </Button>
            </th>
            <th>
              <Button
                variant="outline-success"
                onClick={() => this.props.edit(this.props.id)}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => this.props.delete(this.props.id)}
              >
                Delete
              </Button>
            </th>
          </tr>
        </tbody>
      </Fragment>
    );
  }
}

export default TaskReadOnly;
