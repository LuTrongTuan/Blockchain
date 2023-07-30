const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  deployer.deploy(Voting, ["Option 1", "Option 2", "Option 3"]);
};