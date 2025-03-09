const { Client, ContractExecuteTransaction, ContractFunctionParameters, Hbar, ContractId, PrivateKey} = require("@hashgraph/sdk");
require('dotenv').config();

async function addPosting(contractId, name, price) {
    const client = Client.forTestnet();
    const accountId = process.env.ACCOUNT_ID;
    const privateKey = PrivateKey.fromStringED25519(process.env.PRIVATE_KEY);
    client.setOperator(accountId, privateKey);

    const transaction = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(10000000)
        .setFunction(
            "addPosting",
            new ContractFunctionParameters()
                .addString(name)
                .addString(accountId)
                .addUint256(price)
        );

    const txResponse = await transaction.execute(client);

    const receipt = await txResponse.getReceipt(client);

    if (receipt.status.toString() !== "SUCCESS") {
        console.error("Failed to add posting:", receipt.status.toString());
        return null;
    }

    const record = await txResponse.getRecord(client);
    const newIndex = record.contractFunctionResult.getUint256(0);

    console.log("Posting successfully added at index:", newIndex);

    client.close();
    return newIndex;
}

// addPosting(ContractId.fromString("0.0.5673584"), "sheesh job", 5);
