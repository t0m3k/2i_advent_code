import React from "react";

const width = 395;
const height = 110;
class Santa {
  constructor(x) {
    this.size = x;
    this.x = 40;
    this.y = 80;
    this.verticalSpeed = 0;
    this.snowflakes = [];
    this.points = 0;
    this.life = 15;
  }

  jump() {
    this.verticalSpeed = -2;
    this.y -= 2;
  }

  draw(ctx) {
    if (this.snowflakes.length < 40 && Math.random() > 0.97) {
      this.snowflakes.push(
        new Snowflake(width, Math.floor(Math.random() * (height - 25) + 5))
      );
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
        const life = document.getElementById("life");
        this.life -= 1;
        life.innerText = this.life;
        return false;
      }
      return true;
    });
    // draw santa claus
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.arc(0, 0, this.size / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-this.size / 4, -this.size / 4, this.size / 8, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.size / 4, -this.size / 4, this.size / 8, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-this.size / 4, this.size / 8);
    ctx.lineTo(this.size / 4, this.size / 8);
    ctx.lineTo(0, this.size / 4);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
  }

  frame() {
    if (this.y <= height - this.size / 2) {
      this.verticalSpeed += 0.1;
      this.y += this.verticalSpeed;
    } else {
      if (this.verticalSpeed !== 0) {
        this.verticalSpeed = -this.verticalSpeed * 0.8;
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
      this.horizontalSpeed = 0.15;
      this.size += 0.1;
    }
    this.x -= this.horizontalSpeed;
  }
}

const santa = new Santa(20);

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
