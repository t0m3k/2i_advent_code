import React from "react";

const Day5 = () => {
  const [text, setText] = React.useState("Merry Xmas!");

  const points = text.split("").reduce((acc, letter) => {
    return acc + (letterValues[letter.toLowerCase()] || 0);
  }, 0);

  return (
    <div className="advent-card">
      <div>
        <p className="text-lg">Total: {points}</p>
        <div className="flex">
          {text.split("").map((letter, i) => (
            <ScrabbleLetter key={i} letter={letter} />
          ))}
        </div>
        <input
          className="bg-inherit mt-2 text-center rounded px-2 border-dashed border-2 border-red-700 w-full focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};

// object with scrabble letter values
const letterValues = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10,
};

const ScrabbleLetter = ({ letter }) => {
  return (
    <div className="flex flex-col items-center pt-2 bg-white w-5 mx-[1px] border border-black rounded">
      <div className="text-3xl mb-0 leading-3 text-red-700">
        {letter.toUpperCase()}
      </div>
      <div className="text-sm ">{letterValues[letter.toLowerCase()]}</div>
    </div>
  );
};

export default Day5;
