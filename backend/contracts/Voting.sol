// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Voting {
    uint256 private nextVoteId;

    struct Vote {
        string uri;
        address owner;
        uint256 endTime;
        uint256[] votes;
        mapping(address => bool) voted;
        uint256 options;
    }

    mapping(uint256 => Vote) private votes;
    mapping(address => bool) public members;
    mapping(address => uint256[]) private userVotingHistory;

    event MemberJoined(address indexed member, uint256 joinedAt);
    event VoteCreated(address indexed owner, uint256 indexed voteId, uint256 indexed createdAt, uint256 endTime);
    event Voted(address indexed voter, uint256 indexed voteId, uint256 indexed option, uint256 createdAt);

    modifier isMember() {
        require(members[msg.sender], "you are not a member");
        _;
    }

    modifier canVote(uint256 voteId, uint256 option) {
        require(voteId < nextVoteId, "vote does not exist");
        require(option < votes[voteId].options, "invalid option");
        require(!votes[voteId].voted[msg.sender], "you have already voted");
        require(block.timestamp <= votes[voteId].endTime, "vote has ended");
        _;
    }

    function join() external {
        require(!members[msg.sender], "you are already a member");
        members[msg.sender] = true;
        emit MemberJoined(msg.sender, block.timestamp);
    }

    // Allow a member to add another member
    function addMember(address newMember) external isMember {
        require(!members[newMember], "Already a member");
        members[newMember] = true;
        emit MemberJoined(newMember, block.timestamp);
    }

    function createVote(string memory uri, uint256 endTime, uint256 options) external isMember {
        require(options >= 2 && options <= 8, "number of options must be between 2 and 8");
        require(endTime > block.timestamp, "end time cannot be in past");

        uint256 voteId = nextVoteId++;
        Vote storage newVote = votes[voteId];
        newVote.uri = uri;
        newVote.owner = msg.sender;
        newVote.endTime = endTime;
        newVote.options = options;
        newVote.votes = new uint256[](options);

        emit VoteCreated(msg.sender, voteId, block.timestamp, endTime);
    }

    function vote(uint256 voteId, uint256 option) external isMember canVote(voteId, option) {
        votes[voteId].votes[option]++;
        votes[voteId].voted[msg.sender] = true;
        userVotingHistory[msg.sender].push(voteId);

        emit Voted(msg.sender, voteId, option, block.timestamp);
    }

    // New function to get a user's voting history
    function getUserVotingHistory(address user) external view returns (uint256[] memory) {
        return userVotingHistory[user];
    }

    function getVote(uint256 voteId) public view returns (string memory, address, uint256[] memory, uint256) {
        Vote storage voteNew = votes[voteId];
        return (voteNew.uri, voteNew.owner, voteNew.votes, voteNew.endTime);
    }

    function didVote(address member, uint256 voteId) public view returns (bool) {
        return votes[voteId].voted[member];
    }

    function getTotalVotes(uint256 voteId) public view returns (uint256) {
        require(voteId < nextVoteId, "vote does not exist");
        uint256 totalVotes = 0;
        for (uint256 i = 0; i < votes[voteId].votes.length; i++) {
            totalVotes += votes[voteId].votes[i];
        }
        return totalVotes;
    }

    function getTotalVotesCreated() external view returns (uint256) {
        return nextVoteId;
    }

    function getVoteResults(uint256 voteId) external view returns (uint256[] memory) {
        require(voteId < nextVoteId, "Vote does not exist.");
        uint256[] memory results = new uint256[](votes[voteId].options);
        for (uint256 i = 0; i < votes[voteId].options; i++) {
            results[i] = votes[voteId].votes[i];
        }
        return results;
    }
}
