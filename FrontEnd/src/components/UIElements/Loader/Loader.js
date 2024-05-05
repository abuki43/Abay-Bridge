import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import BackDrop from "../BackDrop/BackDrop";

const Loader = ({ color }) => {
  return (
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
  );
};

export default Loader;
