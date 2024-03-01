import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateVote from "./CreateVotes";
import Votes from "./Votes";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { connect, getContract } from "./contract";
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";
import Alert from "react-bootstrap/Alert"; // Import Bootstrap Alert component for error messages
import UserProfile from "./Profile";
import VotingAnalyticsDashboard from "./AnalyticsDashboard";

function App() {
  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [error, setError] = useState(""); // New state for managing global errors
  const [userAddress, setUserAddress] = useState("");

  // console.log("App.js: contract", contract);
  // console.log("App.js: connected", connected);

  useEffect(() => {
    if (!window.ethereum) {
      setError("Ethereum wallet is not detected. Please install MetaMask.");
      return;
    }

    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        if (accounts.length > 0) {
          handleInit();
        } else {
          setConnected(false);
          setError("Please connect to MetaMask.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while fetching accounts.");
      });
  }, []);

  const handleInit = async () => {
    try {
      setConnected(true);
      const { contract, signer } = await getContract();
      setContract(contract);
      if (contract) {
        const address = await signer.getAddress();
        setUserAddress(address);
        const result = await contract.members(address);
        setIsMember(result);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to initialize contract.");
    }
  };

  const connectCallback = async () => {
    try {
      const { contract } = await connect();
      setContract(contract);
      if (contract) {
        setConnected(true);
        setError(""); // Reset any previous errors
      }
    } catch (error) {
      console.error(error);
      setError("Failed to connect to MetaMask.");
    }
  };

  const becomeMember = async () => {
    if (!contract) {
      setError("Please connect to MetaMask.");
      return;
    }

    await contract
      .join()
      .then(() => {
        alert("Joined");
        setIsMember(true);
      })
      .catch((error) => {
        // alert(error.message)
        setError("Failed to join. Please try again.");
      });
  };

  return (
    <Router>
      <Navbar
        connect={connectCallback}
        connected={connected}
        becomeMember={becomeMember}
        isMember={isMember}
      />
      {error && (
        <Alert variant="danger" className="m-3">
          {error}
        </Alert>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<MainLayout />}>
          <Route
            path="create-vote"
            element={<CreateVote contract={contract} />}
          />
          <Route path="votes" element={<Votes contract={contract} />} />
          <Route
            path="profile"
            element={
              <UserProfile contract={contract} userAddress={userAddress} />
            }
          />
          <Route
            path="analytics"
            element={<VotingAnalyticsDashboard contract={contract} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
