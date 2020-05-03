import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "../components/home";
import { get_tanks } from "../actions/tanks";
import { get_maps } from "../actions/maps";
import { createGame } from "../actions/game";
import Spinner from "../components/spinner";
import { DefaultLink } from "../components/helpers/helpers";

class HomeWrapper extends Component {
  onSubmit = val => {
    this.props.create_game({
      TankId: val.tankId,
      MapId: val.mapId,
      Bet: val.Money,
      Online: true
    });
  };

  componentDidMount() {
    this.props.get_tanks();
    this.props.get_maps();
  }

  render() {
    const { loadInfo } = this.props;
    console.log(this.props);
    if(loadInfo.isSuccess){
      
    }
    const { isSuccess, isPending } = this.props.tanks;
    const { maps } = this.props;
    const content =
      isSuccess & maps.isSuccess ? (
        <Home onSubmit={this.onSubmit} loadInfo={loadInfo} money={this.props.user.money} onCompSubmit={this.ComputerGame} />
      ) : null;
    const spinner =
      isPending | loadInfo.isPending | maps.isPending ? <Spinner /> : null;

    return <> {spinner || content}
    </>;
  }
}

const mapStateToProps = state => {
  return {
    loadInfo: state.createGameInfo,
    user: state.user,
    tanks: state.tanks,
    maps: state.maps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    get_tanks: () => dispatch(get_tanks()),
    get_maps: () => dispatch(get_maps()),
    create_game: data => dispatch(createGame(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);
