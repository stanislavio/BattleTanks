import {
  RIGHT,
  LEFT,
  UP,
  DOWN,
  WIDTH,
  HEIGHT,
  ICON_W,
  ICON_H,
} from "./constants";

export default class Sprite {
  constructor(
    icon,
    x,
    y,
    speed,
    info,
    bullet,
    direct = RIGHT,
    recharge_time = 3500
  ) {
    this.img = new Image();
    this.img.src = icon;
    this.width = ICON_W;
    this.height = ICON_H;
    x = Math.ceil(x / (ICON_W / 2)) * (ICON_W / 2);
    y = Math.ceil(y / (ICON_H / 2)) * (ICON_H / 2);
    this.center_x = x;
    this.center_y = y;
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
    this.direct = direct;
    this.angle = 0;
    this.map = [];
    this.info = info;
    this.speed = speed;
    this.bullet = bullet;
    this.lives = 5;
    this.recharge_time = recharge_time;
    this.last_shoot = new Date().getTime();
    this.enemies = [];
  }

  setMap(map) {
    this.map = map;
    if (map == null) return;
    if (map == []) return;
    if (this.x < 0 && this.y < 0) {
      var randomX, randomY;
      do {
        randomX = Math.floor(Math.random() * map.length);
        randomY = Math.floor(Math.random() * map[randomX].length);
      } while (map[randomX][randomY] != 0);
      this.x = randomY * ICON_H;
      this.y = randomX * ICON_W;
      this.center_x = this.x + ICON_W / 2;
      this.center_y = this.y + ICON_H / 2;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    switch (this.direct) {
      case UP:
        this.angle = -90;
        break;
      case DOWN:
        this.angle = 90;
        break;
      case LEFT:
        this.angle = 180;
        break;
      case RIGHT:
        this.angle = 0;
        break;
    }
    this.drawRotatedImage(
      ctx,
      this.img,
      this.angle,
      this.center_x,
      this.center_y
    );
  }

  drawRotatedImage(ctx, image, angle, x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angle / 180) * Math.PI);
    ctx.drawImage(
      image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }

  move(key, ctx) {
    this.x = this.center_x - this.width / 2;
    this.y = this.center_y - this.height / 2;
    switch (key) {
      case LEFT:
        this.center_x -= this.speed * 0.2;
        this.direct = LEFT;
        if (this.checkColision()) {
          this.center_x += this.speed * 0.2;
        }
        break;
      case UP:
        this.center_y -= this.speed * 0.2;
        this.direct = UP;
        if (this.checkColision()) {
          this.center_y += this.speed * 0.2;
        }
        break;
      case DOWN:
        this.center_y += this.speed * 0.2;
        this.direct = DOWN;
        if (this.checkColision()) {
          this.center_y -= this.speed * 0.2;
        }
        break;
      case RIGHT:
        this.center_x += this.speed * 0.2;
        this.direct = RIGHT;
        if (this.checkColision()) {
          this.center_x -= this.speed * 0.2;
        }
        break;
    }

    this.draw(ctx);
  }

  _getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  checkColision() {
    let x1_coor, x2_coor, y1_coor, y2_coor, x1, x2, y1, y2;
    const x_wall = Math.floor(WIDTH / this.width),
      y_wall = Math.floor(HEIGHT / this.height);
    switch (this.direct) {
      case UP:
        x1 = this.center_x - this.width / 2;
        x2 = this.center_x + this.width / 2;
        y1 = this.center_y - this.height / 2;
        x1_coor = Math.floor((x1 + 1) / this.width);
        y1_coor = Math.floor((y1 + 1) / this.height);
        x2_coor = Math.floor((x2 - 1) / this.width);
        for (var i = 0; i < this.enemies.length; i++) {
          if (
            this.checkColisionWithEnemy(
              this.center_x,
              this.center_y,
              this.enemies[i].center_x,
              this.enemies[i].center_y
            )
          ) {
            return true;
          }
        }
        if (
          x1_coor < 0 ||
          x2_coor < 0 ||
          y1_coor < 0 ||
          x1_coor >= x_wall ||
          x2_coor >= x_wall ||
          y1_coor >= y_wall
        ) {
          return true;
        }
        if (
          this.map[y1_coor][x1_coor] != 0 ||
          this.map[y1_coor][x2_coor] != 0
        ) {
          return true;
        }
        break;
      case DOWN:
        x1 = this.center_x - this.width / 2;
        x2 = this.center_x + this.width / 2;
        y1 = this.center_y + this.height / 2;
        x1_coor = Math.floor((x1 + 2) / this.width);
        y1_coor = Math.floor((y1 - 1) / this.height);
        x2_coor = Math.floor((x2 - 2) / this.width);
        for (var p = 0; p < this.enemies.length; p++) {
          if (
            this.checkColisionWithEnemy(
              this.center_x,
              this.center_y,
              this.enemies[p].center_x,
              this.enemies[p].center_y
            )
          )
            return true;
        }
        if (
          x1_coor < 0 ||
          x2_coor < 0 ||
          y1_coor < 0 ||
          x1_coor >= x_wall ||
          x2_coor >= x_wall ||
          y1_coor >= y_wall
        )
          return true;
        if (this.map[y1_coor][x1_coor] != 0 || this.map[y1_coor][x2_coor] != 0)
          return true;
        break;
      case LEFT:
        x1 = this.center_x - this.width / 2;
        y1 = this.center_y - this.height / 2;
        y2 = this.center_y + this.height / 2;
        x1_coor = Math.floor((x1 + 2) / this.width);
        y1_coor = Math.floor((y1 + 2) / this.height);
        y2_coor = Math.floor((y2 - 2) / this.height);
        for (var j = 0; j < this.enemies.length; j++) {
          if (
            this.checkColisionWithEnemy(
              this.center_x,
              this.center_y,
              this.enemies[j].center_x,
              this.enemies[j].center_y
            )
          )
            return true;
        }
        if (
          x1_coor < 0 ||
          y1_coor < 0 ||
          x1_coor >= x_wall ||
          y2_coor >= y_wall ||
          y1_coor >= y_wall
        )
          return true;
        if (this.map[y1_coor][x1_coor] != 0 || this.map[y2_coor][x1_coor] != 0)
          return true;
        break;
      case RIGHT:
        x1 = this.center_x + this.width / 2;
        y1 = this.center_y - this.height / 2;
        y2 = this.center_y + this.height / 2;
        x1_coor = Math.floor((x1 - 1) / this.width);
        y1_coor = Math.floor((y1 + 2) / this.height);
        y2_coor = Math.floor((y2 - 2) / this.height);
        for (var k = 0; k < this.enemies.length; k++) {
          if (
            this.checkColisionWithEnemy(
              this.center_x,
              this.center_y,
              this.enemies[k].center_x,
              this.enemies[k].center_y
            )
          )
            return true;
        }
        if (
          x1_coor < 0 ||
          y1_coor < 0 ||
          x1_coor >= x_wall ||
          y2_coor >= y_wall ||
          y1_coor >= y_wall
        )
          return true;
        if (this.map[y1_coor][x1_coor] != 0 || this.map[y2_coor][x1_coor] != 0)
          return true;
        break;
    }
    return false;
  }

  checkColisionWithEnemy(x1, y1, x2, y2) {
    x1 = x1 - ICON_W / 2;
    y1 = y1 - ICON_H / 2;
    x2 = x2 - ICON_W / 2;
    y2 = y2 - ICON_H / 2;

    if (
      x1 < x2 + ICON_W - 1 &&
      x1 + ICON_W - 1 > x2 &&
      y1 < y2 + ICON_H - 1 &&
      y1 + ICON_H - 1 > y2
    ) {
      return true;
    }
    return false;
  }
}
