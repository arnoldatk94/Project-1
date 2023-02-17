import React, { Fragment } from "react";
import { Button, Table } from "react-bootstrap";

class TaskEdit extends React.Component {
  constructor(props) {
    super(props);

    // console.log(this.props);
    this.state = {
      title: "",
      task: "",
      priority: this.props.priority,
      id: this.props.keyID,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
    // console.log(this.state); // State is altered here
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const task = this.state;
    this.props.save(task);

    this.setState({
      title: "",
      task: "",
      id: this.props.keyID,
    });
  };

  render() {
    return (
      <Fragment>
        <tbody>
          <tr>
            <th>
              <input
                type="text"
                required="required"
                // placeholder="Rename Task"
                name="title"
                onChange={this.handleChange}
              ></input>
            </th>
            <th>
              <input
                type="text"
                required="required"
                // placeholder="Rename Task"
                name="task"
                onChange={this.handleChange}
              ></input>
            </th>
            <th>{this.props.priority}</th>
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
              <Button variant="outline-success" onClick={this.handleSubmit}>
                Save
              </Button>
            </th>
          </tr>
        </tbody>
      </Fragment>
    );
  }
}

export default TaskEdit;
