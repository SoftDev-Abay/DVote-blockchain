import React from "react";
import { TiTick } from "react-icons/ti";
import "./Hero.css";
const Hero = () => {
  return (
    <div
      id=""
      className=""
      style={{ backgroundColor: "#152a3e", padding: "100px 0" }}
    >
      <div className="container" style={{ maxWidth: "1400px", margin: "auto" }}>
        <div className="d-flex align-items-center gap-5 flex-wrap">
          <div className="col-12 col-lg-5" style={{ zIndex: 1 }}>
            <img
              className="wow fadeIn"
              src="https://www.eballot.com/hubfs/election-security.png"
              alt="Security"
              loading="lazy"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
          <div className="col">
            <h2 className="display-2 font-weight-bold">
              <span style={{ color: "#ffffff", fontWeight: "600" }}>
                Election security you can rely on
              </span>
            </h2>
            <p>
              <span className="h5" style={{ color: "#ffffff" }}>
                Our online election security measures protect you, your data,
                and your organization against risk.
              </span>
            </p>
            <ul
              style={{
                marginTop: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "1.2rem",
                //  delete dots from list
                listStyle: "none",
              }}
            >
              <li style={{ display: "flex", gap: "7px", alignItems: "center" }}>
                <div className="icon-circle-tick">
                  <TiTick className="tick-icon" />
                </div>
                <span style={{ color: "#ffffff" }}>
                  <strong>Safeguard organizational data.</strong> Our
                  cybersecurity measures protect your data.
                </span>
              </li>
              <li style={{ display: "flex", gap: "7px", alignItems: "center" }}>
                <div className="icon-circle-tick">
                  <TiTick className="tick-icon" />
                </div>
                <span style={{ color: "#ffffff" }}>
                  <strong>
                    Eliminate the risk of double voting and voter fraud.&nbsp;
                  </strong>
                  Closed voting events enable trustworthy decision-making.
                </span>
              </li>
              <li style={{ display: "flex", gap: "7px", alignItems: "center" }}>
                <div className="icon-circle-tick">
                  <TiTick className="tick-icon" />
                </div>
                <span style={{ color: "#ffffff" }}>
                  <strong>Vote integrity. </strong>Our robust application
                  security measures ensure the integrity of your vote.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
