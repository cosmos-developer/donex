import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { DonexClient } from "./Donex.client";
import { Decimal } from "@cosmjs/math";
import { Addr } from "./Donex.types";
import { coins } from "@cosmjs/amino";
import { rpcEndpoint, contract_addr, mnemonic } from "@/config/defaults";
export async function createClient() {
  // replace with keplr signer here
  const signer = await DirectSecp256k1HdWallet.fromMnemonic(
    mnemonic,
    {
      prefix: "comdex",
    }
  );
  let accounts = await signer.getAccounts();
  // end replace with keplr signer

  let client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    signer,
    {
      gasPrice: { amount: Decimal.fromUserInput("1000", 0), denom: "ucmdx" },
    }
  );

  let donex = new DonexClient(client, accounts[0].address, contract_addr);
  return donex;
}

export async function createDonexClient(client: SigningCosmWasmClient, accountAddress: string): Promise<DonexClient> {
    let donex = new DonexClient(client, accountAddress, contract_addr)
    return donex
}
export async function submitSocial(
  client: DonexClient,
  address: Addr,
  socialInfo: string[]
) {
  let result = await client.submitSocial({
    address: address,
    socialInfo: socialInfo,
  });

  console.log(result);
}

export async function getSocialsByAddress(client: DonexClient, address: Addr) {
  let result = await client.getSocialsByAddress({
    address: address,
  });

  return result.social_infos;
}
async function getAddressesBySocial(
  client: DonexClient,
  platform: string,
  profileId: string
) {
  let result = await client.getAddressesBySocial({ platform, profileId });
  return result.address;
}
export async function sendDonate(
  client: DonexClient,
  recipient: Addr,
  amount: number,
  denom: string
) {
  let result = await client.donate(
    { recipient },
    "auto",
    "",
    coins(amount, denom)
  );
  return result;
}
try {
  //   // Submit transaction
  //   (async () => {
  //     let client = await createClient();
  //     await submitSocial(client);
  //     // console.log(result)
  //   })();
  //   // Query information from contract
  //   (async () => {
  //     let client = await createClient();
  //     let result = await getSocialsByAddress(client);
  //     console.log(result);
  //   })();

  // Query address, and then send donate
  // (async function () {
  //   let client = await createClient();
  //   let result = await getAddressesBySocial(client, "twitter", "21515614");
  //   console.log(result);
  //   // let result1 = await submitSocial(client, "comdex1sux70phhcv9j4qywaxtwm9nzd4c4a547tpgdkf", ["twitter", "21515614"]);
  //   // console.log(result1);
  //   // let result2 = await sendDonate(client, result[0], 1000000, "ucmst");
  //   // console.log(result2);
  // })();
} catch (e) {
  console.log(e);
}