const { Client, ContractId, ContractCallQuery, ContractFunctionParameters, PrivateKey} = require("@hashgraph/sdk");
require('dotenv').config();

async function getPostingInfo(contractId, postingIndex) {
    const client = Client.forTestnet();
    const accountId = process.env.ACCOUNT_ID;
    const privateKey = PrivateKey.fromStringED25519(process.env.PRIVATE_KEY);
    client.setOperator(accountId, privateKey);

    const query = new ContractCallQuery()
        .setContractId(contractId)       // The contract's ID on Hedera
        .setGas(100000)                  // Set an appropriate gas limit
        .setFunction(
            "getPosting",
            new ContractFunctionParameters().addUint256(postingIndex)
        );

    const result = await query.execute(client);

    const name = result.getString(0);
    const poster = result.getString(1);
    const price = result.getUint256(2);

    client.close();
    return { name, poster, price };
}
