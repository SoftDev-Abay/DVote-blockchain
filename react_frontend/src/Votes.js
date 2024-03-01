import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Alert from "react-bootstrap/Alert"; // For displaying error messages

const Votes = ({ contract }) => {
  const gateway = "https://gateway.pinata.cloud/";
  const [votes, setVotes] = useState([]);
  const [error, setError] = useState(""); // State to keep track of errors

  useEffect(() => {
    if (!contract) {
      setError("Contract is not initialized.");
      return;
    }

    const filter = contract.filters.VoteCreated();
    contract
      .queryFilter(filter)
      .then((result) => {
        setVotesData(result);
        setError("");
      })
      .catch((error) => {
        setError("An error occurred while fetching votes.");
        console.error(error);
      });
  }, [contract]);

  const votePressed = async (id, optionIdx) => {
    try {
      await contract.vote(id, optionIdx);
      alert("Success");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const setVotesData = async (votes) => {
    const promises = votes.map(async (vote) => {
      const { owner, voteId, createdAt, endTime } = vote.args;
      try {
        const voteData = await contract.getVote(voteId);
        const uri = voteData[0];
        if (!uri) return null;

        const currentVotes = voteData[2].map((val) => val.toNumber());

        const newVote = {
          id: voteId.toNumber(),
          owner: owner,
          createdAt: createdAt.toNumber(),
          endTime: endTime.toNumber(),
          totalVotes: currentVotes.reduce((sum, value) => sum + value, 0),
          votes: currentVotes,
        };

        const response = await fetch(gateway + uri);
        const data = await response.json();
        newVote.description = data.description;
        newVote.options = data.options;
        return newVote;
      } catch {
        // Optionally handle individual vote loading errors here
        return null;
      }
    });

    const newVotes = (await Promise.all(promises)).filter(
      (vote) => vote !== null
    );
    setVotes(newVotes);
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      {votes.map((vote) => (
        <Card key={vote.id} className="my-4">
          <Card.Header>{vote.description}</Card.Header>
          <Card.Body>
            {vote.options.map((option, idx) => (
              <div className="mt-1" key={idx}>
                {" "}
                {/* Use index as key for simplicity, consider a better key if available */}
                <p>
                  {option}:{" "}
                  {(vote.votes[idx] / Math.max(1, vote.totalVotes)) * 100}%
                </p>
                <div className="d-flex w-100 align-items-center">
                  <ProgressBar
                    now={(vote.votes[idx] / Math.max(1, vote.totalVotes)) * 100}
                    label={`${vote.votes[idx]}`}
                    className="w-100 me-2"
                  />
                  <Button
                    size="sm"
                    onClick={() => votePressed(vote.id, idx)}
                    variant="dark"
                  >
                    Vote
                  </Button>
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Votes;
