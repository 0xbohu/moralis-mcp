import { FastMCP,TextContent } from "fastmcp";
import { z } from "zod";

import { add } from "./add.js";

import fetch from "node-fetch";
import { any } from "zod/v4";

import {EVMInstance} from './chain/evm.js'


// import jsonData from './sampleData_2126.json' with { type: "json" };

const server = new FastMCP({
  name: "O7 MCP Core",
  version: "1.0.0",
});

server.addTool({

  name: "get_erc20_tokens",
  annotations: {
    openWorldHint: false, // This tool doesn't interact with external systems
    readOnlyHint: true, // This tool doesn't modify anything
    title: "Get list of ERC20 Tokens for an address",
  },
  description: "Get list of ERC20 Tokens for an address",
  execute: async (args) => {
    let evm = new EVMInstance();
    // evm.init();
    const balances = await evm.getWalletTokenBalances(args.address);
    let textCollection: TextContent[] = [];
    balances?.result.forEach((token) => {
      let content: TextContent = {
        type: "text",
        text: `${token?.token?.name?.toString() || "Unknown Token"} ${token?.value?.toString()} `
      };
      textCollection.push(content);
    });

    return {
      content: textCollection
    };
  },
  parameters: z.object({
    address: z.string().describe("EVM Address"),
  }),
});

server.start({
  transportType: "stdio",
});
