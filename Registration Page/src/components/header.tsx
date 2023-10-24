/*
    Make a sticky header with tailwindcss
 */
'use client';
import { Popover, Transition } from '@headlessui/react'
import { chainName } from "@/config/defaults";
import { WalletStatus } from "@cosmos-kit/core";
import { useChain } from "@cosmos-kit/react";
import { useSession } from "next-auth/react";
import { MouseEventHandler, Fragment } from "react";
import Image from 'next/image';
import {
  WalletIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon} from '@heroicons/react/20/solid'
const products = [
  { name: 'Analytics', description: 'Analyze your donations', href: '#', icon: ChartPieIcon },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { data: session, status: sessionStatus } = useSession()
  const { openView, username, connect, disconnect, status } = useChain(chainName);
  const onClickOpenView: MouseEventHandler = (e) => {
    e.preventDefault();
    openView();
  };
  return (
    <header
      className={`flex sticky justify-between top-0 z-10 w-full transition duration-500 ease-in-out bg-gradient-to-r from-violet-500 to-fuchsia-500`}
    >
        <button className="ml-5 rounded-lg bg-purple-damp w-1/3 hover:bg-purple-damp/75 inline-flex justify-start items-center py-2.5 font-medium text-white">
          <Image
            alt="Logo"
            src="/logo.svg"
            placeholder="blur"
            blurDataURL={"/logo.svg"}
            quality={100}
            width={35}
            height={36}
            style={{
              objectFit: 'cover',
              alignSelf: 'center'
            }}
            className="flex-shrink-0 mr-2"
          />
          DonEx
        </button>
        <Popover.Group className="hidden lg:flex lg:gap-x-12 text-white items-center">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white-900">
              Product
              <ChevronDownIcon className="h-5 w-5 flex-none text-white-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg ring-1 ring-white-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-white-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-white-50 group-hover:bg-white">
                        <item.icon className="h-6 w-6 text-white-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-white-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-white-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-white-900/5 bg-white-50">
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <a href="#" className="text-sm font-semibold leading-6 text-white-900">
            Features
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-white-900">
            Company
          </a>
        </Popover.Group>  
      <div className="text-lg flex justify-end items-center w-1/3">
        {sessionStatus === "authenticated" ? (
            <>
              <span className="mr-2 w-2/3 text-white text-right">Hello, {session?.user?.name}</span>
              {status === WalletStatus.Connected && (
                <button
                className="rounded-lg bg-purple-damp w-1/3 hover:bg-purple-damp/75 inline-flex justify-center items-center py-2.5 font-medium text-white"
                onClick={onClickOpenView}
              >
                <WalletIcon className="flex-shrink-0 w-5 h-5 mr-2 text-white" />
                My Wallet
              </button>
              )}
            </>
          ) : (
            <span>You are not logged in</span>
        )}
      </div>
    </header>
  )
}