"use client"

import { LogoGoogle } from "@/icons/logogoogle"
import { signIn } from "next-auth/react";

export function ButonLogin(){

    async function handleLogin() {
        await signIn();
        
        
      }
      
    return(
        <button onClick={handleLogin} className=" flex justify-center items-center gap-4 bg-mdblue-500 text-white font-semibold w-1/3 h-12 rounded-md mt-4">
                <LogoGoogle/>
                Começar agora
              </button>
    )
}