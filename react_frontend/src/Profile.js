import React, { useState, useEffect } from "react";

const UserProfile = ({ userAddress, contract }) => {
  const [votingHistory, setVotingHistory] = useState([]);

  useEffect(() => {
    if (!contract) return;
    const fetchVotingHistory = async () => {
      const history = await contract.getUserVotingHistory(userAddress);

      const historyNumbers = history.map((h) => h.toNumber());
      setVotingHistory(historyNumbers);
    };

    fetchVotingHistory();
  }, [userAddress, contract]);

  console.log("UserProfile.js: votingHistory", votingHistory);

  return (
    <div>
      <h2>User Profile</h2>
      <h3>Voting History</h3>
      <ul>
        {votingHistory.map((voteId) => (
          <li key={voteId}>Vote ID: {voteId}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
