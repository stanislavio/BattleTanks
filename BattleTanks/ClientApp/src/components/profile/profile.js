import React, { Component } from "react";
import "./profile.css";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import { Tabs, Tab, TabPanel } from "@reach/tabs";
import { withStyles } from "@material-ui/core/styles";

const StyledAppBar = withStyles({
  colorPrimary: {
    background:
      "linear-gradient(90deg, rgba(30, 139, 195, 0.2), rgba(255,192,203,0.2))"
  }
})(AppBar);

class Profile extends Component {
  render() {
    const { nickname, photoUrl, email, age, gender } = this.props.user;

    return (
      <>
        <div className="frame-container">
          <ul className="text-container">
            <li> User name: {nickname} </li>
            <li> Email: {email} </li>
            <li> Age: {age} </li>
            <li> Gender: {gender}</li>
          </ul>
          <img className="img-container" src={photoUrl} />
        </div>
        <StyledAppBar position="static">
          <Tabs aria-label="simple tabs example">
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </StyledAppBar>
        <TabPanel index={0}>Item One</TabPanel>
        <TabPanel index={1}>Item Two</TabPanel>
        <TabPanel index={2}>Item Three</TabPanel>
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
