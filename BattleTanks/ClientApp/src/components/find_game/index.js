import React, { Component } from "react";
import { DefaultLinkBlack } from "../helpers/helpers";
import Spinner from "../spinner";
import Button from "@material-ui/core/Button";
import "./find_game.css";

export default class FindGame extends Component {
  onClick = (el) => {
    this.props.joinToGame(el, this.refs.tank.value);
  };

  renderGameCart = (arr) => {
    return arr.map((el) => {
      var player = el.players.find((x) => x.id == this.props.user.id);
      if (player == null)
        return (
          <>
            <label for="tanks">Choose a tank:</label>
            <select id="tanks" ref="tank">
              {this.props.tanks.map((x) => (
                <option value={x.id}>{x.name}</option>
              ))}
            </select>
            <br />
            <Button onClick={() => this.onClick(el.id)}>
              Play with {el.author.nickname}
            </Button>
            <br />
          </>
        );
      return (
        <>
          <DefaultLinkBlack to={"game/" + el.id}>
            <p>Play with {el.author.nickname}</p>
          </DefaultLinkBlack>
        </>
      );
    });
  };

  render() {
    const { data } = this.props;

    const { isPending, isSuccess, isError } = this.props.info;

    const content = isSuccess ? (
      <div>
        <DefaultLinkBlack to={"game/" + this.props.info.data}>
          Go to game
        </DefaultLinkBlack>
      </div>
    ) : null;
    const error = isError ? isError : null;
    const pending = isPending ? <Spinner /> : null;

    return (
      <>
        {content}
        {error}
        {pending}
        {!isSuccess & !isPending ? this.renderGameCart(data) : null}
      </>
    );
  }
}
