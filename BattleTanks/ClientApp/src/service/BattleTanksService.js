export default class BattleTanksService {
  _baseUrl = "api/";

  //Get methods

  getOpenedGames = async (userId) => {
    return await this.getResource("game/getOpenedGames?userId=" + userId);
  };

  getUsers = async () => {
    return await this.getResource("user/all");
  };

  getUser = async (id) => {
    return await this.getResource("user/get?id=" + id);
  };

  getMap = async (id) => {
    return await this.getResource("map/get?id=" + id);
  };

  getMaps = async () => {
    return await this.getResource("map/all");
  };

  getTank = async (id) => {
    return await this.getResource("tanks/get?id=" + id);
  };

  getTanks = async () => {
    return await this.getResource("tanks/all");
  };

  getGameInfo = async (gameId) => {
    return await this.getResource(`game/getGameInfo?gameId=${gameId}`);
  };

  getPlayers = async (gameId) => {
    return await this.getResource(`game/getPlayers?gameId=${gameId}`);
  };

  findGame = async () => {
    return await this.getResource("game/findGames");
  };

  getResource = async (url) => {
    const res = await fetch(this._baseUrl + url, {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      }),
    });
    if (!res.ok) {
      return {
        error: {
          ErrorCode: res.status,
          message: await res.statusText,
        },
      };
    }
    return await res.json();
  };

  //Set methods

  //#region Auth

  setLogin = async (data) => {
    const res = await this.setResource("authentication/login", data);
    if (!res.ok) {
      return { error: await res.text() };
    }
    return await res.json();
  };

  setRegister = async (data) => {
    const res = await this.setResource("authentication/register", data);
    if (!res.ok) {
      return { error: await res.text() };
    }
    return res;
  };

  setConfirmEmail = async (data) => {
    const res = await this.setResource(
      `authentication/verify/${data.id}/${data.token}`
    );
    if (!res.ok) {
      return { error: await res.text() };
    }
    return await res.json();
  };

  //#endregion

  setResource = (url, data) =>
    fetch(this._baseUrl + url, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      }),
      body: JSON.stringify(data),
    });

  setResourceWithData = (url, data) =>
    fetch(this._baseUrl + url, {
      method: "post",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("token"),
      }),
      body: data,
    });

  saveGameData = async (data) => {
    const res = await this.setResource("game/saveGameInfo", data);
    if (!res.ok) {
      return { error: await res.text() };
    }
    return "Success";
  };

  saveGameMapData = async (data) => {
    const res = await this.setResource("game/saveGameMapInfo", data);
    if (!res.ok) {
      return { error: await res.text() };
    }
    return "Success";
  };

  createGame = async (data) => {
    const res = await this.setResource("game/createGame", data);
    if (!res.ok) {
      return { error: await res.text() };
    }
    return res;
  };

  follow = async (userId) => {
    const res = await this.setResource("user/follow?userId=" + userId);
    if (!res.ok) {
      return { error: await res.text() };
    }
    return res;
  };

  addMap = async (data) => {
    let file = new FormData();
    file.append("Photo", data.image.file);
    const res = await this.setResourceWithData("user/changeAvatar", file);
    if (!res.ok) {
      return { error: await res.text() };
    }
    return res;
  };

  addTank = async (data) => {
    let file = new FormData();
    if (data.id) {
      file.append("Id", data.id);
    }

    if (data.image != null) {
      file.append("Photo", data.image.file);
    }

    const res = await this.setResourceWithData("tanks/createOrUpdate", file);
    if (!res.ok) {
      return { error: await res.text() };
    }
    return res;
  };

  joinToGame = async (data) => {
    const res = await this.setResource("game/joinToGame", data);
    if (!res.ok) {
      return { error: await res.text() };
    }
    return "Success";
  };
}
