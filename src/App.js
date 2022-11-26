import "./App.css";
import { useEffect, useState } from "react";
import * as Papa from "papaparse";
import ornament from "./Card/CardAssets/ornament.jpg";
import pokemon from "./Card/CardAssets/poke.jpg";
import code from "./Card/CardAssets/code.jpg";
import amongus from "./Card/CardAssets/amongus.jpg";
import chewy from "./Card/CardAssets/chewy.jpg";
import diehard from "./Card/CardAssets/diehard.jpg";
import santa from "./Card/CardAssets/santa.jpeg";
import overcooked from "./Card/CardAssets/overcooked.jpg";
import halo from "./Card/CardAssets/halo.jpg";
import mario from "./Card/CardAssets/mario.jpg";
import lights from "./fairy-lights.jpg"
import Card from "./Card/card";
const shuffle = "WzQsMTUsMTcsMjYsOSwzMCwxMywxNiwxMiwyM11=";
const days = [5, 8, 14, 6, 7, 2, 9, 12, 13, 1, 16, 15];

const pic = [
  ornament,
  pokemon,
  code,
  amongus,
  chewy,
  diehard,
  santa,
  overcooked,
  halo,
  mario,
];

function App() {
  const [days1, setDays] = useState();
  
  useEffect(() => {
    fetch("./Book.csv")
      .then((csv) => csv.text())
      .then((resText) => {
        const parsed = Papa.parse(resText);
        const newObj = [];
        for (let i = 1; i < parsed.data.length; i++) {
          newObj.push({ challenge: parsed.data[i][0], by: parsed.data[i][1] });
        }
        setDays(newObj);
      });
  }, []);

  if (!days1) {
    return "loading";
  }
  if (days1)
    return (
      <div className="App">
        <div id="advent-calendar" style={{backgroundImage: `url("${lights}")`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
          {days1
            .filter((el, i) => {
              return JSON.parse(atob(shuffle)).includes(i + 1);
            })
            .map((x, i) => (
              <Card 
                days={days}
                pic={pic}
                i={i}
                currentCard={x}
              />
            ))}
        </div>
      </div>
    );
}

export default App;
