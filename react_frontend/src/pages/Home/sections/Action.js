import React from "react";
import { Link } from "react-router-dom";
const Action = () => {
  return (
    <div class="px-4 pt-5 my-5 text-center border-bottom">
      <h1 class="display-4 fw-bold">Take Charge of Your Vote</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          We provide a secure and reliable platform for you to create and manage
          your elections. It is based on the Ethereum blockchain and uses the
          power of smart contracts to ensure the integrity of the election
          process.
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <Link to="/votes">
            <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3">
              All elections
            </button>
          </Link>
          <Link to="/create-vote">
            <button type="button" class="btn btn-outline-secondary btn-lg px-4">
              Create vote
            </button>
          </Link>
        </div>
      </div>
      <div class="overflow-hidden" style={{ maxHeight: "40vh" }}>
        <div class="container px-5">
          <img
            src="/img/voting.jpg"
            class="img-fluid border rounded-3 shadow-lg "
            alt="Example image"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Action;
