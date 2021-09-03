import {QueryClient, setupBankExtension} from "@cosmjs/stargate";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {fromHex} from "@cosmjs/encoding";

const assignment = require('./assignment.json')

const RPC_URL = "https://rpc.pebblenet.cosmwasm.com:443"

test('address is defined and has tokens', async () => {
    expect(assignment.address).not.toEqual("");
    const tmClient = await Tendermint34Client.connect(RPC_URL);
    const client = QueryClient.withExtensions(tmClient, setupBankExtension);
    const response1 = await client.bank.balance(assignment.address, "upebble");
    expect(response1.amount).not.toEqual(0)

    const tx_hash = fromHex(assignment.tx_hash)
    const tx_response = await tmClient.tx({hash: tx_hash})
    expect(tx_response.result.log).toContain(assignment.address)
});