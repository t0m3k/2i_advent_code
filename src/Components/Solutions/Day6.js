import React from "react";

class Santa {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.verticalSpeed = 0;
    this.snowflakes = [];
  }

  jump() {
    this.verticalSpeed = -2;
    this.y -= 3;
  }

  draw(ctx) {
    if (this.snowflakes.length < 20 && Math.random() > 0.95) {
      this.snowflakes.push(new Snowflake(200, Math.floor(Math.random() * 80)));
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
    if (this.y <= 80) {
      this.verticalSpeed += 0.1;
      this.y += this.verticalSpeed;
    } else {
      this.y = 80;
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

  // add event listener for space
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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

  const handleKeyDown = (e) => {
    if (e.key !== " ") return;
    santa.jump();
    console.log("jumped");
  };

  return (
    <div className="advent-card">
      <div>
        <p className="text-lg">
          Total: <span id="points">0</span>
        </p>
        <div className="flex"></div>
        <canvas ref={canvasRef} id="canvas" width="250" height="85"></canvas>
      </div>
    </div>
  );
};

export default Day6;
