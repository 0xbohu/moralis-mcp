import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import dotenv from 'dotenv';
dotenv.config();
export class EVMInstance {
    async getWalletTokenBalances(address) {
        try {
            await Moralis.start({
                apiKey: process.env.MORALIS_API_KEY || ''
            });
            const chain = EvmChain.ETHEREUM;
            const response = await Moralis.EvmApi.token.getWalletTokenBalances({
                address,
                chain,
            });
            return response;
        }
        catch (error) {
            console.error('Error fetching campaigns:', error);
            throw error;
        }
    }
}
