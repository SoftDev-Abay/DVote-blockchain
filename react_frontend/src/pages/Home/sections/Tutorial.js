import React from "react";
import "./Tutorial.css";
import { Link } from "react-router-dom";
import { FaUsers, FaChartPie } from "react-icons/fa";
import { FaRocket, FaFile } from "react-icons/fa6";
const Tutorial = () => {
  return (
    <section
      class="padding-lg bg-light-gray"
      style={{ overflow: "hidden", width: "100%" }}
    >
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-6">
            <h2 class="mt-0">
              Building an election is <span class="font-weight-bold">easy</span>
            </h2>
            <p class="lead mb-4">
              It's easy to build a survery or election on the go with our simple
              and easy to use interface.
            </p>

            <div class="row align-items-center mb-3">
              <div class="col-2 text-center">
                <div class="icon-circle">
                  <FaUsers className="icon" />
                </div>
              </div>
              <div class="col">
                <h5 class="font-weight-bold">Become a member</h5>
                <p>
                  Use your Ethereum wallet to connect to the blockchain and join
                  the election.
                </p>
              </div>
            </div>

            <div class="row align-items-center mb-3">
              <div class="col-2 text-center">
                <div class="icon-circle">
                  <FaFile className="icon" />
                </div>
              </div>
              <div class="col">
                <h5 class="font-weight-bold">Create the question</h5>
                <p>
                  Add questions and add options (candidates, measures, write-in
                  fields, etc.) to your survey.
                </p>
              </div>
            </div>

            <div class="row align-items-center mb-3">
              <div class="col-2 text-center">
                <div class="icon-circle">
                  <FaRocket className="icon" />
                </div>
              </div>
              <div class="col">
                <h5 class="font-weight-bold">Launch the Election</h5>
                <p>
                  When you're done with the question for the survey, you can
                  schedule a end date after which the election will be closed.
                </p>
              </div>
            </div>

            <div class="row align-items-center mb-3">
              <div class="col-2 text-center">
                <div class="icon-circle">
                  <FaChartPie className="icon" />
                </div>
              </div>
              <div class="col">
                <h5 class="font-weight-bold">View Results</h5>
                <p>
                  Watch the results of your election in real-time. After vote
                  you can see the results.
                </p>
              </div>
            </div>

            <div class="row">
              <div class="col text-center">
                <Link to="/create-vote" class="btn btn-success btn-lg">
                  Create Your First Voting <i class="icon-right-circled"></i>
                </Link>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-6 px-sm-5">
            <div class="tablet">
              <div class="tablet-screen">
                <img src={"/img/form-create.png"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
