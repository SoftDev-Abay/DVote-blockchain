import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const CreateVote = ({ contract }) => {
  const [uri, setUri] = useState("");
  const [options, setOptions] = useState(2);
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(""); // State to keep track of errors

  const validateInput = () => {
    if (!uri.trim()) {
      return "IPFS URI is required.";
    }
    if (!endDate) {
      return "End date is required.";
    }
    if (new Date(endDate).getTime() < Date.now()) {
      return "End date must be in the future.";
    }
    if (options < 2 || options > 8) {
      return "Number of options must be between 2 and 8.";
    }
    return ""; // No errors
  };

  const createVote = async () => {
    const errorMessage = validateInput();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    if (!contract) {
      setError("Please connect to Metamask.");
      return;
    }

    setError(""); // Reset error message before attempting to create vote

    await contract
      .createVote(uri, new Date(endDate).getTime(), options)
      .then(() => alert("Success"))
      .catch((error) => setError(error.message));
  };

  return (
    <Form className="m-2">
      <h2 className="d-flex justify-content-center">Create Vote</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Form.Group className="m-2">
        <label htmlFor="uri">IPFS URI</label>
        <Form.Control
          type="text"
          name="uri"
          placeholder="IPFS URI"
          value={uri}
          onChange={(e) => setUri(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="m-2">
        <label htmlFor="options">Number of Options</label>
        <Form.Control
          type="number"
          min={2}
          max={8}
          name="options"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="m-2">
        <label htmlFor="endDate">End Date</label>
        <Form.Control
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="m-2 mt-4">
        <Button variant="success" onClick={createVote}>
          Create
        </Button>
      </Form.Group>
    </Form>
  );
};

export default CreateVote;
