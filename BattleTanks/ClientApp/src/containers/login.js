import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "../components/login";
import login from "../actions/login";

class LoginWrapper extends Component {
  onSubmit = (val) => {
    this.props.login(val.email_or_nickname, val.password);
  };

  componentDidUpdate = () => {
    if (this.props.user.id != null) {
      this.props.history.push("/home");
    }
  };

  render() {
    if (this.props.user.id != null) {
      this.props.history.push("/home");
    }
    return (
      <>
        <div className="row height-100 justify-content-center align-items-center login">
          <div className="col-3">
            <Login onSubmit={this.onSubmit} />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginWrapper);
