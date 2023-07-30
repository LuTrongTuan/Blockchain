// app.js
const web3 = new Web3(Web3.givenProvider);

let votingContract;
let accounts;

async function init() {
    try {
        // Load accounts
        accounts = await web3.eth.requestAccounts();
        // Set the default account to the first account
        web3.eth.defaultAccount = accounts[0];
        
        // Load the contract instance
        const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"; // Replace with your contract address after deployment
        const contractAbi = [
            // Paste the ABI of your deployed contract here
        ];
        
        votingContract = new web3.eth.Contract(contractAbi, contractAddress);

        // Load options
        const optionsList = document.getElementById('options-list');
        const options = await votingContract.methods.options().call();
        options.forEach((option, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${index}: ${option}`;
            optionsList.appendChild(li);
        });

        // Load results
        await loadResults();
    } catch (error) {
        console.error(error);
    }
}

async function vote() {
    try {
        const optionIndex = parseInt(prompt("Enter the index of the option you want to vote for:"));
        if (isNaN(optionIndex)) {
            alert("Invalid option index");
            return;
        }
        await votingContract.methods.vote(optionIndex).send({ from: accounts[0] });
        await loadResults();
    } catch (error) {
        console.error(error);
    }
}

async function loadResults() {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    const options = await votingContract.methods.options().call();
    for (const option of options) {
        const votes = await votingContract.methods.getVotes(option).call();
        const li = document.createElement('li');
        li.innerHTML = `${option}: ${votes} votes`;
        resultsList.appendChild(li);
    }
}

init();
