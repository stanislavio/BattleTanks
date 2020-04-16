import React, { Component } from "react";
import { DefaultLinkBlack, DefaultLink } from "../helpers/helpers";
import Spinner from "../spinner";
import Button from "@material-ui/core/Button";
import "./find_game.css";
import Grid from "@material-ui/core/Grid";
import Card from "../card";

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
            <Grid item xs={4}>
              <Card
                img={el.author.photoUrl}
                title={
                  <DefaultLink
                    className="font-color"
                    to={"profile/" + el.author.id}
                  >
                    {el.author.nickname}{" "}
                  </DefaultLink>
                }
                body={<p>Bet: {el.bet}</p>}
              >
                <label for="tanks">Choose a tank:</label>
                <select id="tanks" ref="tank">
                  {this.props.tanks.map((x) => (
                    <option value={x.id}>{x.name}</option>
                  ))}
                </select>
                <Button onClick={() => this.onClick(el.id)}>
                  Play with {el.author.nickname}
                </Button>
              </Card>
            </Grid>
          </>
        );
      return (
        <>
          <Grid item xs={4}>
            <DefaultLinkBlack to={"game/" + el.id}>
              <p>Play with {el.author.nickname}</p>
            </DefaultLinkBlack>
          </Grid>
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
        <Grid container direction="row" justify="space-between">
          {!isSuccess & !isPending ? this.renderGameCart(data) : null}
        </Grid>
      </>
    );
  }
}
