import { useEffect, useState } from "react";
import "./Day2.css";
const Day2 = () => {
  const [dice1, setDice1] = useState(Math.floor(Math.random() * 6 + 1));
  const [dice2, setDice2] = useState(Math.floor(Math.random() * 6 + 1));

  const rollDice = () => {
    setDice1(Math.floor(Math.random() * 6 + 1));
    setDice2(Math.floor(Math.random() * 6 + 1));
  };

  useEffect(() => {
    window.addEventListener("click", rollDice);
    return () => {
      window.removeEventListener("click", rollDice);
    };
  });

  return (
    <div className="advent-card">
      <div>
        <h1 className="text-3xl">Day 2</h1>
        <p>Pair of rollin' dice</p>
        <div className="flex">
          <CssCube show={dice1} />
          <CssCube show={dice2} />
        </div>
      </div>
    </div>
  );
};

const CssCube = ({ show }) => {
  return (
    <div className="scene leading-3 mx-5">
      <div className={show ? "cube show-" + show : "cube"}>
        <div className="cube__face cube__face--1">
          <Dot />
        </div>
        <div className="cube__face cube__face--2">
          <Dot />
          <Dot />
        </div>
        <div className="cube__face cube__face--3">
          <Dot />
          <Dot />
          <Dot />
        </div>
        <div className="cube__face cube__face--4 grid-cols-2 ">
          <div className="content-center grid">
            <Dot />
            <Dot />
          </div>
          <div className="content-center grid">
            <Dot />
            <Dot />
          </div>
        </div>
        <div className="cube__face cube__face--5">
          <div className="content-center flex">
            <Dot />
            <Dot />
          </div>
          <div className="content-center flex">
            <Dot />
          </div>
          <div className="content-center flex">
            <Dot />
            <Dot />
          </div>
        </div>
        <div className="cube__face cube__face--6">
          <div className="content-center flex mb-2">
            <Dot />
            <Dot />
            <Dot />
          </div>
          <div className="content-center flex">
            <Dot />
            <Dot />
            <Dot />
          </div>
        </div>
      </div>
    </div>
  );
};
const Dot = () => {
  return (
    <div className="m-auto">
      <div className="w-2 h-2 bg-red-700 rounded-full border-red-700 m-1"></div>
    </div>
  );
};
export default Day2;
