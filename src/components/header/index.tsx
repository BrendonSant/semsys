"use client";

import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export function Header() {
  const { status, data } = useSession();

   const router = useRouter();
  
    useEffect(() => {
      if (status === "authenticated") {
        router.push("/dashboard");
      }
    }, [status, router]);

  async function handleLogin() {
    await signIn();
    
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <div className="w-full">
      {status === "loading" && (
        <header className="w-full flex items-center px-4 py-4 bg-transparent h-20 z-50">
        <div className="w-full flex items-center justify-between max-w-[1680px] mx-auto">
          <Link href="/">
            <h1 className="font-bold text-2xl pl-1 hover:text-mblue-500 transition-all duration-500 text-mdblue-500">
              semsys
            </h1>
          </Link>
          {/* Menu hamburguer visível apenas no modo mobile */}
          <div className="md:hidden">
            <button className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          {/* Ícone de carregamento visível apenas no desktop */}
          <button className="hidden md:block animate-spin">
            <FiLoader size={26} color="white" />
          </button>
        </div>
      </header>
      )}

      {status === "unauthenticated" && (
        <header className="w-full flex items-center px-4 py-4 bg-transparent h-20 z-50">
        <div className="w-full flex items-center justify-between max-w-[1680px] mx-auto">
          <Link href="/">
            <h1 className="font-bold text-2xl pl-1 hover:text-mblue-500 transition duration-500 text-mdblue-500">
              semsys
            </h1>
          </Link>
          {/* Menu hambúrguer visível apenas no mobile */}
          <div className="md:hidden">
            <button className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-mdblue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          {/* Botão de login visível apenas no desktop */}
          <button onClick={handleLogin} className="hidden md:block">
            <FiLock size={26} color="white" />
          </button>
        </div>
      </header>
      
      )}

      {status === 'authenticated' && (
       <header className="w-full flex items-center px-4 py-4 bg-transparent h-20 z-50">
       <div className="w-full flex items-center justify-between max-w-[1680px] mx-auto">
         <Link href="/">
           <h1 className="font-bold text-2xl pl-1 hover:text-mblue-500 transition-all duration-500 text-mdblue-500">
             semsys
           </h1>
         </Link>
         {/* Menu hambúrguer visível apenas no mobile */}
         <div className="md:hidden">
           <button className="focus:outline-none">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-8 w-8 text-mdblue-500"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth={2}
                 d="M4 6h16M4 12h16m-7 6h7"
               />
             </svg>
           </button>
         </div>
         {/* Links e ícones visíveis apenas no desktop */}
         <div className="hidden md:flex gap-6">
           <Link href={"/dashboard"}>
             <span className="text-mdblue-500 hover:underline">Dashboard</span>
           </Link>
           <Link href={"/servicing"}>
             <span className="text-mdblue-500 hover:underline">Serviços</span>
           </Link>
           <Link href={"/customers"}>
             <span className="text-mdblue-500 hover:underline">Clientes</span>
           </Link>
           <Link href={"/suppliers"}>
             <span className="text-mdblue-500 hover:underline">Fornecedores</span>
           </Link>
           <Link href={"/products"}>
             <span className="text-mdblue-500 hover:underline">Produtos</span>
           </Link>
         </div>
         <div className="hidden md:flex items-center gap-4">
           <Link href={"/dashboard"}>
             <FiUser size={26} color="#072e5a" />
           </Link>
           <button onClick={handleLogout} className="focus:outline-none">
             <FiLogOut size={26} color="#072e5a" />
           </button>
         </div>
       </div>
     </header>
     
      )}
    </div>
  );
}



