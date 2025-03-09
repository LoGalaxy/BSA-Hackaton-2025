const { Client, ContractId, ContractCallQuery, ContractFunctionParameters, PrivateKey} = require("@hashgraph/sdk");
require('dotenv').config();

async function getPostingInfo(contractId, postingIndex) {
    // Create a Hedera client instance (using Testnet in this example)
    const client = Client.forTestnet();
    const accountId = process.env.ACCOUNT_ID;
    const privateKey = PrivateKey.fromStringED25519(process.env.PRIVATE_KEY);
    client.setOperator(accountId, privateKey);
    // Uncomment and set your operator account ID and private key if required:
    // client.setOperator(process.env.MY_ACCOUNT_ID, process.env.MY_PRIVATE_KEY);

    // Build a query to call the 'getPosting' function of the smart contract.
    const query = new ContractCallQuery()
        .setContractId(contractId)       // The contract's ID on Hedera
        .setGas(100000)                  // Set an appropriate gas limit
        .setFunction(
            "getPosting",
            new ContractFunctionParameters().addUint256(postingIndex)
        );

    // Execute the query on the Hedera network.
    const result = await query.execute(client);

    // Parse the response from the contract:
    // The Solidity function returns (string name, address poster, uint256 price).
    const name = result.getString(0);
    const poster = result.getString(1);
    const price = result.getUint256(2);

    client.close();
    return { name, poster, price };
}

// Example usage:
(async () => {
    const contractId = "0.0.5673584"; // Replace with your deployed contract's ID.
    const postingIndex = 1;        // For example, retrieve the first posting.
    try {
        const posting = await getPostingInfo(ContractId.fromString("0.0.5673584"), 3);
        console.log("Posting Details:", posting);
    } catch (error) {
        console.error("Error retrieving posting:", error);
    }
})();