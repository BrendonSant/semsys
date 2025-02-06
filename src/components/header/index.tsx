"use client";

import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";


export function Header() {
  let { status, data } = useSession();

  async function handleLogin() {
    await signIn();
    
    
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <div className="w-full">
      {status === "loading" && (
        <header className="fixed top-0 left-0 right-0 w-full flex items-center px-4 py-4 bg-transparent h-20 z-50 ">
          <div className="w-full flex my-auto items-center justify-between max-w-[1920px] mx-auto">
            <Link href="/">
              <h1 className="font-bold text-2xl pl-1 hover:tracking-widest text-mdblue-500">
                semsys
              </h1>
            </Link>
            <button className=" animate-spin">
            <FiLoader size={26} color="white"/>
            </button>
           
          </div>
        </header>
      )}

      {status === "unauthenticated" && (
        <header className="fixed top-0 left-0 right-0 w-full flex items-center px-4 py-4 bg-transparent h-20 z-50 ">
          <div className="w-full flex my-auto items-center justify-between max-w-[1920px] mx-auto">
            <Link href="/">
              <h1 className="font-bold text-2xl pl-1 hover:tracking-widest text-mdblue-500">
                semsys
              </h1>
            </Link>
            <button onClick={handleLogin}>
            <FiLock size={26} color="white"/>
            </button>
            
          </div>
        </header>
      )}

      {status === 'authenticated' && (
        <header className="w-full flex items-center px-4 py-4 bg-transparent h-20 z-50 ">
          <div className="w-full flex my-auto items-center justify-between max-w-[1920px] mx-auto">
            <Link href="/">
              <h1 className="font-bold text-2xl pl-1 hover:tracking-widest text-mdblue-500">
                semsys
              </h1>
            </Link>
            <div className="flex gap-6">
              <Link href={"/dashboard"}>
                <span className="text-mdblue-500">Dashboard</span>
              </Link>
              <Link href={"/servicing"}>
                <span className="text-mdblue-500">Serviços</span>
              </Link>
              <Link href={"/customers"}>
                <span className="text-mdblue-500">Clientes</span>
              </Link>
              <Link href={"/suppliers"}>
                <span className="text-mdblue-500">Fornecedores</span>
              </Link>
              <Link href={"/products"}>
                <span className="text-mdblue-500">Produtos</span>
              </Link>
            </div>
            <div className="flex items-baseline gap-4">
              <Link href={"/dashboard"}>
                <FiUser size={26} color="mdblue-500" />
              </Link>

              <button onClick={handleLogout}>
              <FiLogOut size={26} color="mdblue-500" />
              </button>
              
            </div>
          </div>
        </header>
      )}
    </div>
  );
}



