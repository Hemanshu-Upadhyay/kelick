import React from "react";

const LoaderSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <img src="/icons/Loader.png" className="animate-spin" />
    </div>
  );
};

export default LoaderSpinner;
