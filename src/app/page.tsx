'use client'
import { LogoSys } from "@/icons/logosys";
import { Logo } from "@/icons/logo";
import Aurora from "@/components/animations/background/aurora";
import { LogoBig } from "@/icons/logosysbig";
import { signIn, useSession} from "next-auth/react";
import { LogoGoogle } from "@/icons/logogoogle";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  async function handleLogin() {
    await signIn();
    
    
  }

  return (
    <main className="flex items-center flex-col justify-center min-h-screen ">
      <div className="flex items-center gap-10 flex-col lg:flex-row lg:justify-between  justify-center w-full ">
        <div className="flex flex-col items-center justify-around h-screen w-1/2">
          <div className="flex flex-col justify-center items-center gap-6">
            <LogoSys />
            <h1 className="font font-bold text-2xl pl-1 hover:tracking-widest text-mdblue-500">
              semsys
            </h1>
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-bold text-3xl md:text-4xl text-mdblue-500 font-montserrat">
                  Gerencie sua empresa
                </h1>
                <h3 className="font-semibold text-xl md:text-2xl text-mdblue-500 font-montserrat">
                  Atendimentos e clientes
                </h3>
              </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center  w-full ">
              
              <h1 className="font-bold text-3xl md:text-2xl text-mgray-300 font-montserrat">
                Faça seu cadastro ou login
              </h1>
              <h3 className="font-semibold text-xl md:text-xl text-mgray-300 ">
                Praticidade e simplicidade.
              </h3>
              <button onClick={handleLogin} className=" flex justify-center items-center gap-4 bg-mdblue-500 text-white font-semibold w-1/3 h-12 rounded-md mt-4">
                <LogoGoogle/>
                Começar agora
              </button>
              
            </div>

          </div>
          <div className="flex gap-4 justify-center items-center">
                <span>powered by</span>
                <div className="flex flex-col text-black justify-center items-center">
                  <Logo />
                  <span className="font-semibold font-montserrat">santsmcb</span>
                </div>
              </div>
        </div>

        <div className="relative flex flex-col items-center justify-around h-screen w-1/2">
          {/* Aurora */}
          <Aurora  speed={1.5} />

          {/* Conteúdo principal */}
          <div className=" absolute flex flex-col justify-around h-screen items-center z-10">
            <LogoBig />
          </div>
        </div>
      </div>
    </main>
  );
}
