import {CosmWasmClient} from "@cosmjs/cosmwasm-stargate"

const assignment = require('./assignment.json')

const RPC_URL = "https://rpc.pebblenet.cosmwasm.com:443"

test('cw20 token is set', async () => {
    expect(assignment.cw20_addr).not.toEqual("");
    expect(assignment.address).not.toEqual("");
    let client = await CosmWasmClient.connect(RPC_URL);
    let res = await client.queryContractSmart(assignment.cw20_addr, {balance: { address: assignment.address }});
    console.log(res)
});