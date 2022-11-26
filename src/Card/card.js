import React, {useState, useEffect} from 'react';
const Card = ({days, pic, i, currentCard}) => {
    const month = 11
    return(
        <div
        className={`advent-card ${days[i] <= new Date().getDate() &&
          new Date().getMonth() === month ? '' : 'closed'}`}
        style={{
          backgroundImage:
            days[i] <= new Date().getDate() &&
            new Date().getMonth() === month
              ? "none"
              : `url("${pic[i]}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor:
            days[i] <= new Date().getDate() &&
            new Date().getMonth() === month
              ? "black"
              : "none",
          color:
            days[i] <= new Date().getDate() &&
            new Date().getMonth() === month
              ? "green"
              : "rgba(178, 65, 0, 1)"
        }}
      >
        <p>
          {days[i] <= new Date().getDate() &&
          new Date().getMonth() === month
            ? JSON.parse(atob(currentCard)).challenge + ' - ' + JSON.parse(atob(currentCard)).by 
            : days[i]}
        </p>
      </div>
    )
}
export default Card