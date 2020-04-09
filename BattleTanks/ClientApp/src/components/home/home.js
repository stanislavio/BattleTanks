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
import {
  renderSelectTankField,
  DefaultLinkBlack,
  renderTextField,
} from "../helpers/helpers";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
  textPrimary: {
    color: "white",
  },
})(Button);

class Home extends Component {
  render() {
    const { submitting, handleSubmit, loadInfo } = this.props;
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
          <Field
            className="back"
            style={{ width: "30%", marginTop: "17px", borderRadius: "5px" }}
            name="Money"
            component={"input"}
            type="number"
            placeholder={"Your Bet"}
            step="10"
            min="10"
            max={this.props.money}
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
            style={{ marginTop: "-5px" }}
            type="submit"
            value="New Game"
            color="primary"
          >
            Create Game
          </StyledButton>
          <br />
          {loadInfo.isError ? (
            <div className="error-text">{loadInfo.data.error}</div>
          ) : null}
        </form>
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
