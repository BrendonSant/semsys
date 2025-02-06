import Image from "next/image";
import heroImg from "../assets/grafico-de-linha-unscreen.gif";
import { LogoSys } from "@/icons/logosys";
import { Logo } from "@/icons/logo";
import Aurora from "@/components/animations/background/aurora";

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-screen ">
      <div className="flex items-center gap-10 flex-col lg:flex-row lg:justify-between  justify-center w-full ">
        <div className="flex flex-col items-center justify-around h-[calc(100vh-80px)] w-1/2">
          <div className="flex flex-col justify-center items-center">
            <LogoSys />
            <h1 className="font font-bold text-2xl pl-1 hover:tracking-widest text-mdblue-500">
              semsys
            </h1>
          </div>
          <div className="flex flex-col items-center justify-start w-full h-1/2">
            <div className="flex flex-col items-center justify-center  w-full ">
              <div className="flex flex-col justify-center items-center mb-8">
                <h1 className="font-bold text-3xl md:text-4xl text-mdblue-500">
                  Gerencie sua empresa
                </h1>
                <h3 className="font-semibold text-xl md:text-2xl text-mdblue-500">
                  Atendimentos e clientes
                </h3>
              </div>
              <h1 className="font-bold text-3xl md:text-2xl text-mgray-300">
                Faça seu cadastro ou login
              </h1>
              <h3 className="font-bold text-xl md:text-xl text-mgray-300">
                Praticidade e simplicidade.
              </h3>
              <button className="bg-mdblue-500 text-white font-semibold w-1/3 h-12 rounded-md mt-4">
                Começar agora
              </button>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-around h-screen w-1/2">
          {/* Aurora */}
          <Aurora colors={["#ffffff", "#ffffff", "#ffffff"]} speed={0.8} />

          {/* Conteúdo principal */}
          <div className=" absolute flex flex-col justify-around h-screen items-center z-10">
            <LogoSys />

            
            <div className="flex flex-col text-white">
              <Logo />
              <span>santsmcb</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
