import {QueryClient, setupBankExtension} from "@cosmjs/stargate";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";

const ADDRESS = require('./index');

const RPC_URL = "http://rpc.oysternet.cosmwasm.com:80"

test('address is defined and has tokens', async () => {
    expect(ADDRESS).not.toEqual("");
    const tmClient = await Tendermint34Client.connect(RPC_URL);
    const client = QueryClient.withExtensions(tmClient, setupBankExtension);
    const response1 = await client.bank.balance(ADDRESS, "usponge");
    console.log(response1)
    expect(response1.amount).not.toEqual("0");
});