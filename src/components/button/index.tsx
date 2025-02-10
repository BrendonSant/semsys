"use client";

import { LogoGoogle } from "@/icons/logogoogle";
import { signIn } from "next-auth/react";

export function ButonLogin() {
  async function handleLogin() {
    await signIn();
  }

  return (
    <button
      onClick={handleLogin} 
  className="flex w-3/2 px-6 justify-center items-center gap-4 transition-all duration-1000 ease-in-out bg-mdblue-500 text-white font-semibold md:w-1/2 lg:w-1/3 h-12 rounded-md mt-4 hover:scale-105 hover:bg-[#35c9cc]"
    >
      <LogoGoogle />
      Começar agora
    </button>
  );
}
