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
          <Dice show={dice1} />
          <Dice show={dice2} />
        </div>
      </div>
    </div>
  );
};

const Dice = ({ show }) => {
  return (
    <div className="scene leading-3 mx-5">
      <div className={show ? "dice show-" + show : "dice"}>
        <div className="dice_face dice_face--1">
          <Dot />
        </div>
        <div className="dice_face dice_face--2">
          <div className="rotate-45 content-center grid">
            <Dot />
            <div className="m-auto w-2 h-2 m-1" />
            <Dot />
          </div>
        </div>
        <div className="dice_face dice_face--3">
          <div className="rotate-45 content-center grid">
            <Dot />
            <Dot />
            <Dot />
          </div>
        </div>
        <div className="dice_face dice_face--4 grid-cols-2 ">
          <div className="content-center grid absolute top-[3px] left-[18px] -rotate-45">
            <Dot />
            <div className="m-auto w-2 h-2 m-1" />
            <Dot />
          </div>
          <div className="content-center grid absolute top-[3px] left-[18px] rotate-45">
            <Dot />
            <div className="m-auto w-2 h-2 m-1" />
            <Dot />
          </div>
        </div>
        <div className="dice_face dice_face--5">
          <div className="content-center grid absolute top-[3px] left-[18px] -rotate-45">
            <Dot />
            <Dot />
            <Dot />
          </div>
          <div className="content-center grid absolute top-[3px] left-[18px] rotate-45">
            <Dot />
            <Dot />
            <Dot />
          </div>
        </div>
        <div className="dice_face dice_face--6">
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
