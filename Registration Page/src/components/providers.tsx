"use client";

import { ChainProvider } from "@cosmos-kit/react";
import { chains, assets } from "chain-registry";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation";
import { TailwindModal } from '@/components';
import { SignerOptions } from "@cosmos-kit/core";
import {Chain} from '@chain-registry/types'
import { Decimal } from "@cosmjs/math";

export function Providers({ children }: { children: any }) {
  const signerOptions: SignerOptions = {
    signingCosmwasm: (chain: Chain) => {
      switch (chain.chain_name) {
        case 'comdex':
          return {
            gasPrice: { amount: Decimal.fromUserInput("1000", 0), denom: "ucmdx" }
          };
      }
    }
  };
  return (
    // <ChakraProvider>
      <ChainProvider
        chains={chains} // supported chains
        assetLists={assets} // supported asset lists
        wallets={[...keplrWallets, ...leapWallets, ...cosmostationWallets]}
        walletModal={TailwindModal}
        endpointOptions={
          {
            endpoints: {
              "comdex": {
                rpc: [process.env.NEXT_PUBLIC_RPC_ENDPOINT || "http://localhost:1317"],
                rest: [process.env.NEXT_PUBLIC_RPC_ENDPOINT || "http://localhost:1317"],
              }
            }
          }
        }
        signerOptions={signerOptions}
      >
        {children}
      </ChainProvider>
    // </ChakraProvider>
  );
}