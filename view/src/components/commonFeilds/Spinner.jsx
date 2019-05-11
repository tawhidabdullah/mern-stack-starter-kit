import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <img
      src={spinner}
      style={{ width: "200px", display: "block", margin: "auto" }}
      alt="this is a great spinner"
    />
  );
};

export default Spinner;
