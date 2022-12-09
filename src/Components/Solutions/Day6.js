import React from "react";

const width = 400;
const height = 115;
class Santa {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.verticalSpeed = 0;
    this.snowflakes = [];
  }

  jump() {
    this.verticalSpeed = -2;
    this.y -= 2;
  }

  draw(ctx) {
    if (this.snowflakes.length < 40 && Math.random() > 0.98) {
      this.snowflakes.push(
        new Snowflake(width, Math.floor(Math.random() * height - 25))
      );
    }
    this.snowflakes = this.snowflakes.filter((snowflake) => {
      snowflake.draw(ctx);
      snowflake.frame();

      if (
        snowflake.x < this.x + 5 &&
        snowflake.x > this.x - 5 &&
        snowflake.y < this.y + 5 &&
        snowflake.y > this.y - 5
      ) {
        const points = document.getElementById("points");
        points.innerText = parseInt(points.innerText) + 1;
        return false;
      }
      if (snowflake.x < 0) {
        return false;
      }
      return true;
    });
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
  }

  frame() {
    if (this.y <= height - 10) {
      this.verticalSpeed += 0.1;
      this.y += this.verticalSpeed;
    } else {
      this.y = height - 10;
      this.verticalSpeed = 0;
    }
  }
}

class Snowflake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.horizontalSpeed = 0.5;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
  }

  frame() {
    this.x -= this.horizontalSpeed;
  }
}

const santa = new Santa(25, 80);

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
        <p className="text-md">
          Flappy Santa but I had no time to do it properly. Use the W key or
          click to jump
        </p>
        <p className="text-md">
          Total: <span id="points">0</span>
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
