const {
    Client,
    ContractCreateFlow,
    ContractCallQuery,
    ContractExecuteTransaction,
    ContractFunctionParameters,
    DelegateContractId,
    Hbar,
    PrivateKey
} = require('@hashgraph/sdk');
require('dotenv').config();

/**
 * Deploying a smart contract to the Hedera Testnet using the Hedera File Service
 */
async function deploySmartContract() {
    /*//////////////////////////////////////////////////////////////
                            SET ENVIRONMENT
    //////////////////////////////////////////////////////////////*/
    const accountId = process.env.ACCOUNT_ID;
    const privateKey = PrivateKey.fromStringED25519(process.env.PRIVATE_KEY);

    // Check setup
    if (!accountId || !privateKey) {
        throw Error('Environment variables must be set up properly!');
    }
    console.log('Environment set up!');
    console.log('\n');

    // Create a Hedera Testnet Client
    const client = Client.forTestnet();
    client.setOperator(accountId, privateKey);

    /*//////////////////////////////////////////////////////////////
                            DEPLOY CONTRACT
    //////////////////////////////////////////////////////////////*/

    let storage = require('./Postings.json');
    const bytecode = storage.data.bytecode.object;

    // Create the contract on Hedera Testnet
    //  1. Creates a file with compiled bytecode of the contract
    //  2. Creates a contract on the testnet
    let contractTx = await new ContractCreateFlow()
        .setGas(1000000)
        .setBytecode(bytecode);

    // Submit the transaction to the Hedera test network
    console.log('Executing transaction of contract deployment...');
    const contractResponse = await contractTx.execute(client);
    console.log('Transaction executed and contract deployed !');
    console.log('\n');

    // Get the receipt of the contract's transaction
    console.log('Getting receipt of the transaction...');
    const contractReceipt = await contractResponse.getReceipt(client);

    // Get the smart contract ID
    const contractId = contractReceipt.contractId;
    console.log('The smart contract ID is ' + contractId);
    console.log('\n');

    /*//////////////////////////////////////////////////////////////
                        CONTRACT FUNCTION CALLS
    //////////////////////////////////////////////////////////////*/

    // Add funds to the piggy bank -> calls a function on the smart contract
    /*
    const contractAddNameTx = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(1000000)
        .setFunction('setName', new ContractFunctionParameters().addString("test test"));
     */

    // Submit the transaction to the Hedera testnet and store the response
    /*
    console.log('Adding name');
    const submitTx = await contractAddNameTx.execute(client);

     */

    // Get the receipt of the transaction
    /*
    console.log('Getting the receipt of the transaction...');
    const receipt = await submitTx.getReceipt(client);
     */

    // Confirm the transaction was executed successfully
    /*
    console.log('The transaction status is: ' + receipt.status.toString());
    console.log('\n');
     */

    // Query the contract to get the updated funds
    /*
    const contractQueryName = new ContractCallQuery()
        .setContractId(contractId)
        .setGas(1000000)
        .setFunction('getName', new ContractFunctionParameters().addUint8(0));
     */

    // Submit the transaction to the Hedera testnet and get the new saved amount
    /*console.log('Executing query transaction...');
    const contractName = await contractQueryName.execute(client);
    console.log('Got name: ' + contractName.getString(0));*/

    process.exit(0);
}

deploySmartContract();