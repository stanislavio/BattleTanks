import React, { Component } from "react";
import NotFound from "../Route guard/404";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ModalWind from "../modal";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import "./home.css";
import { renderSelectTankField, DefaultLinkBlack } from "../helpers/helpers";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
  textPrimary: {
    color: "white",
  },
})(Button);

class Home extends Component {
  render() {
    const { submitting, handleSubmit } = this.props;
    return (
      //className="row width-100 height-100 justify-content-center align-items-center"
      <div className="frame">
        <form className="text-center w-100" onSubmit={handleSubmit}>
          <Field
            className="back"
            name="tankId"
            component={renderSelectTankField}
            data={this.props.tanks.data}
            text={"Select tank"}
          />
          <br />
          <Field
            className="back"
            name="mapId"
            component={renderSelectTankField}
            data={this.props.maps.data}
            text={"Select map"}
          />
          <br />
          <StyledButton
            disabled={submitting}
            type="submit"
            value="New Game"
            color="primary"
          >
            Create Game
          </StyledButton>
        </form>
        <DefaultLinkBlack to="/find-game">Find game</DefaultLinkBlack>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tanks: state.tanks,
  maps: state.maps,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

Home = reduxForm({
  form: "game",
})(Home);

Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;
