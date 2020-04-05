import React, { Component } from "react";
import "./profile.css";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

const StyledPaper = withStyles({
  root: {
    background: "rgba(0,0,0,0)",
  },
})(Paper);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledPaper className="center">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab className="tab" label="Friends" />
        <Tab className="tab" label="Stats" />
        <Tab className="tab" label="Other" />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </StyledPaper>
  );
}

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
            <li> Gender: {gender ? "Male" : "Female"}</li>
          </ul>
          <img className="img-container" src={photoUrl} />
        </div>
        <CenteredTabs />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
