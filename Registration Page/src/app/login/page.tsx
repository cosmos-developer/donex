'use client';
import Image from 'next/image'
import styles from './styles.module.css'
import { useChain } from "@cosmos-kit/react"
import { chainName } from '@/config/defaults';
import { WalletSection } from '@/components';
import { WalletStatus } from '@cosmos-kit/core';
import { useSession, signIn } from "next-auth/react"
import { useEffect, useState } from 'react';
import { getSocialsByAddress, createClient, submitSocial} from '@/app/api/donex';
// import { DonexClient } from "@/app/api/donex/Donex.client"
export interface ILoginPageProps {
  
}



export default function LoginPage (props: ILoginPageProps) {
  const { data: session, status: sessionStatus } = useSession()
  const { address, connect, disconnect, wallet, status } = useChain(chainName);
  const [checkConnected, setCheckConnected] = useState(false);
  useEffect(() => {
    if (!checkConnected && status === WalletStatus.Connected && sessionStatus === "authenticated" && address) {
      setCheckConnected(true);
      const povider: string = (session as any).provider;
      const userId: string = (session as any).user.id;
      const linking = async (address: string) => {
        // const client = await getSigningCosmWasmClient();
        const donexClient = await createClient();
        const socials = await getSocialsByAddress(donexClient, address);
        for(const social of socials) {
          if(social[0] === povider) {
            console.log("Already linked with account:", social[1]);
            return
          }
        }
        await submitSocial(donexClient, address, [povider, userId]);
        
      }
      linking(address!);
      
    }
  },[status, sessionStatus]);

  async function handleConnectFacebook () {
    await signIn("facebook");
  }

  function handleConnectGoogle () {
    signIn("google", { callbackUrl: '/login' });
  }
  function handleConnectTwitter() {
    signIn("twitter", { callbackUrl: '/login' });
  }

  return (
    <div className="flex flex-row-reverse">
      <div className={styles.bgWrap}>
        <Image
          alt="Mountains"
          src="/login-background.jpg"
          placeholder="blur"
          blurDataURL={"/login-background.jpg"}
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      
      <div className={styles.loginBg}>
          <div className={styles.loginContainer + " flex flex-col space-y-10"}>
            <p className='font-mono text-3xl text-zinc-900 font-semibold'>Login</p>
            <div className={styles.loginItem + " flex flex-col space-y-5 py-1 px-10"}>
                <p className='font-mono text-3xl text-zinc-900 font-semibold self-center my-5'>Connect a Wallet</p>
                <WalletSection/>
                {status === WalletStatus.Connected && (
                  <>
                  <button className={styles.itemBox + " border-sky-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"} onClick={async () => {await handleConnectFacebook();}}>
                  <div className='self-center ml-6'>
                    <Image
                      alt="Facebook"
                      src="/facebook.svg"
                      placeholder="blur"
                      blurDataURL={"/facebook.svg"}
                      quality={100}
                      width={35}
                      height={50}
                      style={{
                        objectFit: 'cover',
                        alignSelf: 'center'
                      }} 
                    />
                  </div>
                  <p className={styles.itemText}>Connect Facebook</p>
                </button>
                {/* <button className={styles.itemBox + " border-sky-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"} onClick={handleConnectGoogle}>
                  <div className='self-center ml-6'>
                    <Image
                      alt="Google"
                      src="/google.svg"
                      placeholder="blur"
                      blurDataURL={"/google.svg"}
                      quality={100}
                      width={35}
                      height={50}
                      style={{
                        objectFit: 'cover',
                        alignSelf: 'center'
                      }} 
                    />
                  </div>
                  <p className={styles.itemText}>Connect Google</p>
                </button>
                <button className={styles.itemBox + " border-sky-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"} onClick={handleConnectTwitter}>
                  <div className='self-center ml-6'>
                    <Image
                      alt="Twitter"
                      src="/twitter.svg"
                      placeholder="blur"
                      blurDataURL={"/twitter.svg"}
                      quality={100}
                      width={35}
                      height={50}
                      style={{
                        objectFit: 'cover',
                        alignSelf: 'center'
                      }} 
                    />
                  </div>
                  <p className={styles.itemText}>Connect Twitter</p>
                </button> */}
                </>
                )}
            </div>
          </div>
      </div>
    </div>
  );
}
