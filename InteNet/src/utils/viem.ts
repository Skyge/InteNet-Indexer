import { createPublicClient, http } from "viem";
import {
  base,
  bsc,
} from "viem/chains";

export enum ChainId {
  BASE = 8453,
  BSC = 56,
}

export const publicClients = {
  56: createPublicClient({
    chain: bsc,
    transport: http(process.env.RPC_URL),
    batch: { multicall: true },
  }),
  8453: createPublicClient({
    chain: base,
    transport: http(process.env.RPC_URL),
    batch: { multicall: true },
  }),
};
