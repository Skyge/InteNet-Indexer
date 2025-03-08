/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  BNBBonding,
  BNBBonding_Launched,
} from "generated";
import {
  fetchTokenInfo,
} from "./utils/bonding";
import type { publicClients } from "./utils/viem";

BNBBonding.Launched.handler(async ({ event, context }) => {
  console.log("BNBBonding.Launched event handler called");
  const result = await fetchTokenInfo(event.params.token, event.chainId as keyof typeof publicClients, event.srcAddress);

  const entity: BNBBonding_Launched = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    token: event.params.token,
    name: result.name,
    symbol: result.symbol,
    totalSupply: result.totalSupply,
    creator: result.tokenInfo[0],
    pair: result.tokenInfo[2],
    locker: result.tokenInfo[3],
    description: result.tokenInfo[4],
    image: result.tokenInfo[5],
    twitter: result.tokenInfo[6],
    telegram: result.tokenInfo[7],
    farcaster: result.tokenInfo[8],
    website: result.tokenInfo[9],
    status: result.tokenInfo[10],
    totalTokens: event.params.totalTokens,
    tokenType: event.params.tokenType,
    timestamp: BigInt(event.block.timestamp),
  };

  context.BNBBonding_Launched.set(entity);
});
