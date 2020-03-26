import React, { Component } from "react";
import "./profile.css";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { nickname, photoUrl, email, age, gender } = this.props.user;

    return (
      <>
        <div className="frame-container">
          <p className="text-container"> User name: {nickname} </p>
          <p className="text-container"> Email: {email} </p>
          <p className="text-container"> Age: {age} </p>
          <p className="text-container"> Gender: {gender}</p>
          <img className="img-container" src={photoUrl} />
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
