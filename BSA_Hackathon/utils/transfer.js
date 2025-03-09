const { Client, HbarUnit, ContractFunctionParameters, ContractCallQuery, TransferTransaction, Hbar, PrivateKey} = require("@hashgraph/sdk");
require('dotenv').config();

async function executeHbarTransferForPosting(contractId, postingIndex) {
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
    const poster = queryResponse.getString(1);
    const price = queryResponse.getUint256(2).toNumber();



    console.log(`Retrieved posting: Name = ${postingName}, Poster = ${poster}, Price (tinybars) = ${price}`);

    if (!poster || !poster.startsWith("0.0.")) {
        console.error("Invalid poster account ID:", poster);
        return;
    }
    client.setDefaultMaxTransactionFee(new Hbar(100));
    client.setDefaultMaxQueryPayment(new Hbar(50));


    const transferTx = new TransferTransaction()
        .addHbarTransfer(accountId, new Hbar(-price, HbarUnit.Hbar)) // Sender
        .addHbarTransfer(poster, new Hbar(price, HbarUnit.Hbar)) // Receiver
        .setTransactionMemo(postingName)
        .freezeWith(client);

    const transferTxId = transferTx.transactionId;

    const transferTxSigned = await transferTx.sign(privateKey);

    const transferTxSubmitted = await transferTxSigned.execute(client);

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
