import "./Day2.css";
const Day2 = () => {
  return (
    <div className="advent-card">
      <div>
        <h1 className="text-3xl">Day 2</h1>
        <p>Pair of rollin' dice</p>
        <div className="flex">
          <CssCube />
          <CssCube />
        </div>
      </div>
    </div>
  );
};

const CssCube = () => {
  return (
    <div className="scene mx-5">
      <div className="cube">
        <div className="cube__face cube__face--front">1</div>
        <div className="cube__face cube__face--back">2</div>
        <div className="cube__face cube__face--right">3</div>
        <div className="cube__face cube__face--left">4</div>
        <div className="cube__face cube__face--top">5</div>
        <div className="cube__face cube__face--bottom">6</div>
      </div>
    </div>
  );
};

export default Day2;
