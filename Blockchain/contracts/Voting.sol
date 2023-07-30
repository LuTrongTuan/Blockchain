// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {

    struct Option {
        string name;
        uint256 voteCount;
    }

    Option[] public options;

    mapping(address => bool) public hasVoted;

    constructor(string[] memory optionNames) {
        for (uint256 i = 0; i < optionNames.length; i++) {
            options.push(Option({name: optionNames[i], voteCount: 0}));
        }
    }

    function vote(uint256 optionIndex) public {

        require(!hasVoted[msg.sender], "You have already voted.");

        require(optionIndex < options.length, "Invalid option.");

        options[optionIndex].voteCount++;

        hasVoted[msg.sender] = true;
    }

    function getOptions() public view returns (string[] memory, uint256[] memory) {
        string[] memory optionNames = new string[](options.length);
        uint256[] memory voteCounts = new uint256[](options.length);

        for (uint256 i = 0; i < options.length; i++) {
            optionNames[i] = options[i].name;
            voteCounts[i] = options[i].voteCount;
        }

        return (optionNames, voteCounts);
    }
}
