"use client"

import { LogoGoogle } from "@/icons/logogoogle"
import { signIn } from "next-auth/react";

export function ButonLogin(){

    async function handleLogin() {
        await signIn();
        
        
      }
      
    return(
        <button onClick={handleLogin} className=" flex w-3/2 px-6  justify-center items-center gap-4 bg-mdblue-500 text-white font-semibold md:w-1/2 lg:w-1/3 h-12 rounded-md mt-4 hover:bg-mblue-500 transition duration-500">
                <LogoGoogle/>
                Começar agora
              </button>
    )
}