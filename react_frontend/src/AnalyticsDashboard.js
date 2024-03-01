import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VotingAnalyticsDashboard = ({ contract }) => {
  const [totalVotesCreated, setTotalVotesCreated] = useState(0);
  const [voteResults, setVoteResults] = useState([]);
  const [selectedVoteId, setSelectedVoteId] = useState(0);

  useEffect(() => {
    if (!contract) return;

    const fetchData = async () => {
      const total = await contract.getTotalVotesCreated();
      setTotalVotesCreated(total.toNumber());
      if (total.toNumber() > 0) {
        const results = await contract.getVoteResults(0); // Example: Fetch results for the first vote
        setVoteResults(results.map((vote) => vote.toNumber()));
      }
    };

    fetchData();
  }, [contract]);

  const data = {
    labels: voteResults.map((_, index) => `Option ${index + 1}`),
    datasets: [
      {
        label: "Votes",
        data: voteResults,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Voting Analytics Dashboard</h2>
      <p>Total Votes Created: {totalVotesCreated}</p>
      <Bar data={data} options={options} />
    </div>
  );
};

export default VotingAnalyticsDashboard;
