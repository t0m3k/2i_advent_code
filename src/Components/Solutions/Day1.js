import React, { useMemo } from "react";

const Day1 = () => {
  const days = useMemo(
    () =>
      Math.ceil(
        (new Date(new Date().getFullYear(), 11, 25) - new Date()) /
          (1000 * 60 * 60 * 24)
      ),
    []
  );
  return (
    <div className="advent-card">
      <div>
        <h1 className="text-3xl">Day 1</h1>
        <p className="text-lg">
          There are {days} days until{" "}
          <span className="text-red-700">Christmas</span>
        </p>
      </div>
    </div>
  );
};

export default Day1;
