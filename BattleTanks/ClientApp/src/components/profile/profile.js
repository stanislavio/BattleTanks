import React, { Component } from "react";
import "./profile.css";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import get_user, { getOpenedGames, follow } from "../../actions/profile";
import Spinner from "../spinner";
import { DefaultLink } from "../helpers/helpers";
import { Link } from "react-router-dom";
import Card from "../card";
import Grid from "@material-ui/core/Grid";
import defaultPhoto from "../../photo/default-user-icon-8.jpg";
import Chart from '../chart';
import Moment from 'moment';

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

function CenteredTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderMyGames = (arr) => {
    console.log(arr);
    return arr.map((el) => (
      <Grid key={el.id} item xs={4} className="item">
        <Card
          img={el.author.photoUrl}
          title={
            <DefaultLink className="font-color" to={"/profile/" + el.author.id}>
              {el.author.nickname}{" "}
            </DefaultLink>
          }
          body={<p>Bet: {el.bet}</p>}
        >
          <DefaultLink to={"/game/" + el.id}>
            <p>Go to game</p>
          </DefaultLink>
        </Card>
      </Grid>
    ));
  };

  const renderFriendCart = (arr) => {
    if (arr == null)
      return <p className="text-center">You don't have friends yet</p>;
    return arr.map((el) => {
      return (
        <>
          <Grid key={el.id} item xs={4} className="item">
            <Card
              img={el.photoUrl}
              title={
                <DefaultLink className="font-color" to={"/profile/" + el.id}>
                  {el.nickname}{" "}
                </DefaultLink>
              }
            ></Card>
          </Grid>
        </>
      );
    });
  };

  const { isPending, isError, isSuccess, data } = props.games;

  const wins = props.profile.stats.Stats.map(x => (x.wins));
  const loses = props.profile.stats.Stats.map(x => (x.loses));
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
        <Tab className="tab" label="Opened Games" />
        <Tab className="tab" label="Stats" />
      </Tabs>
      <TabPanel className="tab" value={value} index={0}>
        <Grid container> {renderFriendCart(props.profile.friends)} </Grid>
      </TabPanel>
      <TabPanel className="tab" value={value} index={1}>
        {isPending ? <Spinner /> : null}
        {isSuccess ? (
          <Grid container>{renderMyGames(props.games.data)}</Grid>
        ) : null}
      </TabPanel>
      <TabPanel className="tab" value={value} index={2}>
        <Chart categories={props.profile.stats.Stats.map(x => {
          return Moment(x.name).format('MMM D');
        })}
        series={[{
            name: 'Wins',
            data: wins
        },
        {
          name: 'Loses',
          data: loses
        }]} 
        title={'Tanker static'} />
      </TabPanel>
    </StyledPaper>
  );
}

class Profile extends Component {
  componentWillMount() {
    this.props.get_user(this.props.match.params.userId);
    this.props.get_opened_game(this.props.match.params.userId);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.match.params.userId != this.props.match.params.userId) {
      this.props.get_user(nextProps.match.params.userId);
      this.props.get_opened_game(nextProps.match.params.userId);
    }
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
                <li> User name: {data.nickname}</li>
                <li> Email: {data.email} </li>
                <li> Age: {data.age} </li>
                <li> Gender: {data.gender ? "Male" : "Female"}</li>
              </ul>

              {this.props.user.id == data.id ? (
                <Link to="/change-photo" className="img-container">
                  <img
                    className="img-adjust edit-prof "
                    src={data.photoUrl == null ? defaultPhoto : data.photoUrl}
                  />
                </Link>
              ) : (
                <>
                  <img
                    className="img-adjust"
                    src={data.photoUrl == null ? defaultPhoto : data.photoUrl}
                  />
                </>
              )}

              {this.props.user.id == data.id ? null : (
                <div>
                  {this.props.user.friends.find((el) => el.id == data.id) !=
                  null ? (
                    <StyledButton
                      onClick={() => this.props.follow_user(data.id)}
                      className="follow"
                      fullWidth={true}
                      type="submit"
                      color="primary"
                    >
                      Unfollow
                    </StyledButton>
                  ) : (
                    <StyledButton
                      onClick={() => this.props.follow_user(data.id)}
                      className="follow"
                      fullWidth={true}
                      type="submit"
                      color="primary"
                    >
                      Follow
                    </StyledButton>
                  )}
                </div>
              )}
            </div>
            <CenteredTabs
              games={this.props.myGames}
              profile={this.props.profile.data}
            />
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
  myGames: state.myGames,
});

const mapDispatchToProps = (dispatch) => {
  return {
    follow_user: (userId) => dispatch(follow(userId)),
    get_user: (userId) => dispatch(get_user(userId)),
    get_opened_game: (userId) => dispatch(getOpenedGames(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
