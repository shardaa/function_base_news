import React from "react";
import Loading from "./spinner.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img src={Loading} alt="" height="40px" />
    </div>
  );
};

export default Spinner;
