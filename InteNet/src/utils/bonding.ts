import { bondingAbi, erc20Abi } from "./abis";
import { publicClients } from "./viem";

export async function fetchTokenInfo(
  tokeAddress: string,
  chainId: keyof typeof publicClients,
  bonding: string
): Promise<{
  readonly name: string,
  readonly symbol: string,
  readonly totalSupply: bigint,
  readonly tokenInfo: [`0x${string}`, `0x${string}`, `0x${string}`, `0x${string}`, string, string, string, string, string, string, number],
}> {
  let results: [string, string, bigint, readonly [`0x${string}`, `0x${string}`, `0x${string}`, `0x${string}`, string, string, string, string, string, string, number]];
  try {
    results = await publicClients[chainId].multicall({
      allowFailure: false,
      contracts: [
      {
        address: tokeAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "name",
      },
      {
        address: tokeAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "symbol",
      },
      {
        address: tokeAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "totalSupply",
      },
      {
        address: bonding as `0x${string}`,
        abi: bondingAbi,
        functionName: "tokenInfo",
        args: [tokeAddress as `0x${string}`]
      },
    ]});
  } catch (error) {
    console.log("Multicall failed!");
    results = ["unknown","unknown",BigInt(0), ["0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000","","","","","","",0]];
  }

  // Parse the results
  const [name, symbol, totalSupply, tokenInfo] = results;

  // Return the parsed results
  return {
    name: name,
    symbol: symbol,
    totalSupply: totalSupply,
    tokenInfo: [...tokenInfo],
  };
}
