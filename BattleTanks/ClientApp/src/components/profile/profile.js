import React, { Component } from "react";
import "./profile.css";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { nickname, photoUrl, email } = this.props.user;
    return (
      <>
        <div className="text">
          User name: {nickname}
          <p>Email: {email}</p>
          <img src={photoUrl} />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
