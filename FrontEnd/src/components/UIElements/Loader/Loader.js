import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import BackDrop from "../BackDrop/BackDrop";
import "./loader.css";

const Loader = ({ color }) => {
  return (
    <div className="loader">
      <BackDrop>
        <ClipLoader
          color={color}
          loading={true}
          // cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </BackDrop>
    </div>
  );
};

export default Loader;
