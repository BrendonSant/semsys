"use client";

import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  function handleDropDown() {}

  return (
    <div className="w-full flex z-50">
      {status === "loading" && (
        <header className="w-full flex items-center px-4 py-4 bg-transparent h-20 z-50">
          <div className="w-full flex items-center justify-between max-w-[1680px] mx-auto">
            <Link href="/">
              <h1 className="font-bold text-2xl pl-1 hover:text-mblue-500 transition-all duration-500 text-mdblue-500">
                semsys
              </h1>
            </Link>

            <button className="block md:block animate-spin">
              <FiLoader size={26} color="" />
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

            {/* Botão de login visível apenas no desktop */}
            <button onClick={handleLogin} className="block md:block lg:block">
              <FiLock size={26} color="grey" />
            </button>
          </div>
        </header>
      )}

      {status === "authenticated" && (
        <header className="w-full flex items-center px-4 py-4 bg-transparent h-20 z-50">
          <div className="w-full flex items-center justify-between max-w-[1680px] mx-auto">
            <Link href="/">
              <h1 className="font-bold text-2xl pl-1 hover:text-mblue-500 transition-all duration-500 text-mdblue-500">
                semsys
              </h1>
            </Link>
            {/* Menu hambúrguer visível apenas no mobile */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={handleDropDown} className="md:hidden focus:outline-none" >
                
                  
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
                  
                
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={"/dashboard"}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/servicing"}>Serviços</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/customers"}>Clientes</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/suppliers"}>Fornecedores</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/products"}>Produtos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-1" onClick={handleLogout}>
                  <FiLogOut size={12} color="#072e5a" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Links e ícones visíveis apenas no desktop */}
            <div className="hidden md:flex gap-6">
              <Link href={"/dashboard"}>
                <span className="text-mdblue-500 hover:underline">
                  Dashboard
                </span>
              </Link>
              <Link href={"/servicing"}>
                <span className="text-mdblue-500 hover:underline">
                  Serviços
                </span>
              </Link>
              <Link href={"/customers"}>
                <span className="text-mdblue-500 hover:underline">
                  Clientes
                </span>
              </Link>
              <Link href={"/suppliers"}>
                <span className="text-mdblue-500 hover:underline">
                  Fornecedores
                </span>
              </Link>
              <Link href={"/products"}>
                <span className="text-mdblue-500 hover:underline">
                  Produtos
                </span>
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
