import React, { Fragment } from "react";
import { Button } from "react-bootstrap";

class TaskEdit extends React.Component {
  constructor(props) {
    super(props);

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
    const disableStatus = this.state.title === "" || this.state.task === "";
    return (
      <Fragment>
        <tbody>
          <tr>
            <th>
              <textarea
                rows={3}
                type="textarea"
                required="required"
                placeholder={this.props.title}
                name="title"
                onChange={this.handleChange}
              ></textarea>
            </th>
            <th>
              <textarea
                rows={3}
                required="required"
                placeholder={this.props.task}
                name="task"
                onChange={this.handleChange}
              ></textarea>
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
              <Button
                variant="outline-success"
                onClick={this.handleSubmit}
                disabled={disableStatus}
              >
                Save
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => this.props.cancel(this.props.editContactId)}
              >
                Cancel
              </Button>
            </th>
          </tr>
        </tbody>
      </Fragment>
    );
  }
}

export default TaskEdit;
