import React, { Component } from "react";
import { connect } from "react-redux";
import register from "../actions/register";
import Registration from "../components/registration";

class RegistrationWrapper extends Component {
  onSubmit = (val) => {
    this.props.register({
      Nickname: val.nickname,
      Email: val.email,
      Age: val.age,
      Password: val.password,
      Gender: parseInt(val.gender1),
    });
  };

  render() {
    const { isSuccess } = this.props.registration;
    if (isSuccess) {
      this.props.history.push("/login");
    }

    return (
      <>
        <div className="row height-100 justify-content-center align-items-center login">
          <div className="col-3 text">
            <Registration onSubmit={this.onSubmit} />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    registration: state.register,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(register(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationWrapper);
