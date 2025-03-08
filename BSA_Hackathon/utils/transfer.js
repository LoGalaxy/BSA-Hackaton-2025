const { Client, HbarUnit, ContractFunctionParameters, ContractCallQuery, TransferTransaction, Hbar, PrivateKey} = require("@hashgraph/sdk");
require('dotenv').config();

async function executeHbarTransferForPosting(contractId, postingIndex) {
    // Create a Hedera client instance for Testnet.
    const client = Client.forTestnet();
    const accountId = process.env.OPERATOR_ACCOUNT_ID;
    const privateKey = PrivateKey.fromStringED25519(process.env.OPERATOR_ACCOUNT_PRIVATE_KEY);
    client.setOperator(accountId, privateKey);

    const query = new ContractCallQuery()
        .setContractId(contractId)
        .setGas(300000)
        .setFunction(
            "getPosting",
            new ContractFunctionParameters().addUint256(postingIndex)
        );

    const queryResponse = await query.execute(client);
    const postingName = queryResponse.getString(0);
    const poster = queryResponse.getString(1); // Expected format: "0.0.xxxx"
    const price = queryResponse.getUint256(2).toNumber(); // Assuming price is small enough to be converted to a number


    // Retrieve posting details using your existing function

    console.log(`Retrieved posting: Name = ${postingName}, Poster = ${poster}, Price (tinybars) = ${price}`);

    // Validate poster account ID
    if (!poster || !poster.startsWith("0.0.")) {
        console.error("Invalid poster account ID:", poster);
        return;
    }
    //Set the default maximum transaction fee (in HBAR)
    client.setDefaultMaxTransactionFee(new Hbar(100));
    //Set the default maximum payment for queries (in HBAR)
    client.setDefaultMaxQueryPayment(new Hbar(50));


    // Create the transfer transaction
    const transferTx = new TransferTransaction()
        .addHbarTransfer(accountId, new Hbar(-price, HbarUnit.Hbar)) // Sender
        .addHbarTransfer(poster, new Hbar(price, HbarUnit.Hbar)) // Receiver
        .setTransactionMemo(postingName)
    // Freeze the transaction to prepare for signing
        .freezeWith(client);

    // Get the transaction ID for the transfer transaction
    const transferTxId = transferTx.transactionId;

    // Sign the transaction with the account that is being debited (operator account) and the transaction fee payer account (operator account)
    // Since the account that is being debited and the account that is paying for the transaction are the same, only one account's signature is required
    const transferTxSigned = await transferTx.sign(privateKey);

    //Submit the transaction to the Hedera Testnet
    const transferTxSubmitted = await transferTxSigned.execute(client);

    //Get the transfer transaction receipt
    const transferTxReceipt = await transferTxSubmitted.getReceipt(client);
    const transactionStatus = transferTxReceipt.status;

    const receipt = await transferTxSubmitted.getReceipt(client);

    client.close();

    if (receipt.status.toString() === "SUCCESS") {
        console.log("✅ Transfer successful with memo:", postingName);
        return receipt;
    } else {
        console.error("❌ Transfer failed with status:", receipt.status.toString());
        return null;
    }
}

// Example usage:
/*(async () => {
    const contractId = "0.0.5673584"; // Replace with your contract ID
    const postingIndex = 2;        // Replace with the posting index you want to use
    try {
        await executeHbarTransferForPosting(contractId, postingIndex);
    } catch (error) {
        console.error("Error executing transfer:", error);
    }
})();*/
