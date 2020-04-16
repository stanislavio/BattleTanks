import React, { Component } from "react";
import "./profile.css";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import get_user from "../../actions/profile";
import Spinner from "../spinner";
import { Link } from "react-router-dom";

const StyledPaper = withStyles({
  root: {
    background: "rgba(0,0,0,0)",
  },
})(Paper);

const StyledButton = withStyles({
  textPrimary: {
    color: "white",
  },
  label: {
    boxShadow: "0px 2px 20px pink",
    fontSize: "15px",
    borderRadius: "15px",
    padding: "10px",
    marginBottom: "10px",
    marginTop: "10px",
  },
})(Button);

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
      <TabPanel className="tab" value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel className="tab" value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel className="tab" value={value} index={2}>
        Item Three
      </TabPanel>
    </StyledPaper>
  );
}

class Profile extends Component {
  componentWillMount() {
    this.props.get_user(this.props.match.params.userId);
  }

  render() {
    const { data } = this.props.profile;

    const { isSuccess, isPending } = this.props.profile;

    const spinner = isPending ? <Spinner /> : null;

    return (
      <>
        {isSuccess ? (
          <>
            <div className="frame-container">
              <ul className="text-container">
                <li> User name: {data.nickname} </li>
                <li> Email: {data.email} </li>
                <li> Age: {data.age} </li>
                <li> Gender: {data.gender ? "Male" : "Female"}</li>
              </ul>

              {this.props.user.id == data.id ? (
                <Link to="/edit_profile" className="img-container">
                  <img className="img-adjust edit-prof" src={data.photoUrl} />{" "}
                </Link>
              ) : (
                <>
                  <img className="img-adjust" src={data.photoUrl} />{" "}
                </>
              )}

              {this.props.user.id == data.id ? null : (
                <div>
                  <StyledButton
                    className="follow"
                    fullWidth={true}
                    type="submit"
                    color="primary"
                  >
                    Follow
                  </StyledButton>
                  <StyledButton
                    className="follow"
                    fullWidth={true}
                    type="submit"
                    color="primary"
                  >
                    Unfollow
                  </StyledButton>
                </div>
              )}
            </div>
            <CenteredTabs />
          </>
        ) : null}
        {spinner}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    get_user: (userId) => dispatch(get_user(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
