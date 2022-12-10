import React from "react";

const width = 395;
const height = 110;
class Santa {
  constructor(x) {
    this.size = x;
    this.x = 60;
    this.y = 0;
    this.verticalSpeed = 0;
    this.snowflakes = [];
    this.points = 0;
    this.life = 100;
    this.gravity = 0.02;
    this.jumpSpeed = 0.8;
    this.startTime = Date.now();
    this.snowflakePosition = height / 2;
    this.snowflakeMaxPosition = height - 25;
    this.snowflakeMinPosition = 5;
  }

  jump() {
    this.verticalSpeed = -this.jumpSpeed;
  }

  randomizeSnowflakePosition() {
    const newPosition = this.snowflakePosition + Math.random() * 20 - 10;
    if (newPosition > this.snowflakeMaxPosition) {
      this.snowflakePosition = this.snowflakeMaxPosition;
    } else if (newPosition < this.snowflakeMinPosition) {
      this.snowflakePosition = this.snowflakeMinPosition;
    } else {
      this.snowflakePosition = newPosition;
    }
  }

  newSnowflake() {
    this.randomizeSnowflakePosition();
    const time = Date.now() - this.startTime;
    const horizontalSpeed = Math.min(0.3 + time / 50000, 5);
    this.snowflakes.push(
      new Snowflake(width, this.snowflakePosition, horizontalSpeed)
    );
  }

  draw(ctx) {
    if (this.life <= 0) {
      ctx.fillStyle = "red";
      ctx.font = "30px Arial";
      ctx.fillText("Xmas Over", 10, 50);
      return;
    }
    if (this.snowflakes.length < 100 && Math.random() > 0.95) {
      this.newSnowflake();
    }
    this.snowflakes = this.snowflakes.filter((snowflake) => {
      snowflake.draw(ctx);

      snowflake.frame();

      if (
        snowflake.x < this.x + this.size / 2 &&
        snowflake.x > this.x - this.size / 2 &&
        snowflake.y < this.y + this.size / 2 &&
        snowflake.y > this.y - this.size / 2
      ) {
        this.points += 1;
        document.getElementById("points").innerText = this.points;
        return false;
      }
      if (snowflake.x < 0) {
        this.life -= 1;
        return false;
      }
      document.getElementById("life").innerText = this.life;
      return true;
    });
    this.santa(ctx);
  }

  santa(ctx) {
    // draw red circle
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.arc(0, 0, this.size / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
  }

  frame() {
    if (this.y <= height - this.size / 2) {
      this.verticalSpeed += this.gravity;
      this.y += this.verticalSpeed;
    } else {
      if (this.verticalSpeed > 0.3) {
        this.verticalSpeed = -this.verticalSpeed * 0.4;
      }
      this.y = height - this.size / 2;
    }
  }
}

class Snowflake {
  explode = false;
  size = 2;
  constructor(x, y, horizontalSpeed = 0.3) {
    this.x = x;
    this.y = y;
    this.horizontalSpeed = horizontalSpeed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.explode ? "red" : "white";
    ctx.fill();
    ctx.restore();
  }

  frame() {
    if (this.x < 20 && !this.explode) {
      this.explode = true;
    }

    if (this.explode) {
      this.horizontalSpeed = 0.2;
      this.size += 0.05;
    }
    this.x -= this.horizontalSpeed;
  }
}

const santa = new Santa(30);

const Day6 = () => {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "w") {
        santa.jump();
      }
    });

    window.addEventListener("click", () => {
      santa.jump();
    });

    return () => {
      window.removeEventListener("keydown", () => {});
      window.removeEventListener("click", () => {});
    };
  }, []);

  const renderFrame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    santa.frame();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    santa.draw(ctx);
  };

  const tick = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestAnimationFrame(tick);
  };

  React.useEffect(() => {
    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="advent-card">
      <div>
        <p className="text-md">Flappy Santa. Use the W key or click to jump</p>
        <p className="text-md">
          Total: <span id="points">0</span>. Life:{" "}
          <span id="life">{santa.life}</span>
        </p>
        <div className="flex"></div>
        <canvas
          ref={canvasRef}
          id="canvas"
          width={width}
          height={height}
        ></canvas>
      </div>
    </div>
  );
};

export default Day6;
