/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.35.3.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import {
  CosmWasmClient,
  SigningCosmWasmClient,
  ExecuteResult,
} from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import {
  InstantiateMsg,
  ExecuteMsg,
  Addr,
  QueryMsg,
  GetAddressesBySocialResponse,
  GetSocialsByAddressResponse,
} from "./Donex.types";
export interface DonexReadOnlyInterface {
  contractAddress: string;
  getAddressesBySocial: ({
    platform,
    profileId,
  }: {
    platform: string;
    profileId: string;
  }) => Promise<GetAddressesBySocialResponse>;
  getSocialsByAddress: ({
    address,
  }: {
    address: Addr;
  }) => Promise<GetSocialsByAddressResponse>;
}
export class DonexQueryClient implements DonexReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.getAddressesBySocial = this.getAddressesBySocial.bind(this);
    this.getSocialsByAddress = this.getSocialsByAddress.bind(this);
  }

  getAddressesBySocial = async ({
    platform,
    profileId,
  }: {
    platform: string;
    profileId: string;
  }): Promise<GetAddressesBySocialResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_addresses_by_social: {
        platform,
        profile_id: profileId,
      },
    });
  };
  getSocialsByAddress = async ({
    address,
  }: {
    address: Addr;
  }): Promise<GetSocialsByAddressResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_socials_by_address: {
        address,
      },
    });
  };
}
export interface DonexInterface extends DonexReadOnlyInterface {
  contractAddress: string;
  sender: string;
  submitSocial: (
    {
      address,
      socialInfo,
    }: {
      address: Addr;
      socialInfo: string[];
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>;
  donate: (
    {
      recipient,
    }: {
      recipient: Addr;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>;
}
export class DonexClient extends DonexQueryClient implements DonexInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(
    client: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.submitSocial = this.submitSocial.bind(this);
    this.donate = this.donate.bind(this);
  }

  submitSocial = async (
    {
      address,
      socialInfo,
    }: {
      address: Addr;
      socialInfo: string[];
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        submit_social: {
          address,
          social_info: socialInfo,
        },
      },
      fee,
      memo,
      _funds
    );
  };
  donate = async (
    {
      recipient,
    }: {
      recipient: Addr;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        donate: {
          recipient,
        },
      },
      fee,
      memo,
      _funds
    );
  };
}