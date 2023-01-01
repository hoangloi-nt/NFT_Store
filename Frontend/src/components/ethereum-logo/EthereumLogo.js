import React from "react";
import "../../styles/ethereumLogo.scss";

const EthereumLogo = () => {
  return (
    <div className="container-logo">
      <div className="wrapper">
        <div className="pyramid">
          <div className="square">
            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
          </div>
        </div>

        <div className="pyramid inverse">
          <div className="square">
            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthereumLogo;
