
import { LogoSys } from "@/icons/logosys";
import { Logo } from "@/icons/logo";
import Aurora from "@/components/animations/background/aurora";
import { LogoBig } from "@/icons/logosysbig";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ButonLogin } from "@/components/button";





export default async function Home() {

  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const session = await getServerSession(authOptions)
    if (session){
      redirect('/dashboard')
    }
  
    
  
  return (
    <main className=" top-0 absolute w-full flex items-center flex-col justify-center min-h-screen">
      <div className="flex  items-center gap-10 flex-col lg:flex-row lg:justify-between  justify-center w-full ">
        <div className="flex z-10 flex-col items-center justify-around h-screen w-full lg:w-1/2">
          <div className="flex flex-col justify-center items-center gap-6">
            <LogoSys />
            <h1 className="font font-bold text-2xl pl-1 hover:tracking-widest text-white lg:text-mdblue-500">
              semsys
            </h1>
            <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="font-bold text-3xl text-center md:text-4xl text-mgray-100 lg:text-mdblue-500 font-montserrat">
                  Gerencie sua empresa
                </h1>
                <h3 className="font-semibold text-center text-xl md:text-2xl text-mgray-300 lg:text-mdblue-500 font-montserrat">
                  Atendimentos e clientes
                </h3>
              </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center  w-full ">
              
              <h1 className="font-bold text-center text-2xl md:text-2xl text-mgray-300 font-montserrat">
                Faça seu cadastro ou login
              </h1>
              <h3 className="font-semibold text-center  text-xl md:text-xl text-mgray-300 ">
                Praticidade e simplicidade.
              </h3>
              <ButonLogin/>
              
            </div>

          </div>
          <div className="flex gap-4 justify-center items-center text-mgray-300 md:text-black">
                <span>powered by</span>
                <div className="flex flex-col text-mgray-300 md:texte-black justify-center items-center">
                  <Logo classname=' fill-white md:fill-black' />
                  <span className="font-semibold font-montserrat">santsmcb</span>
                </div>
              </div>
        </div>

        <div className="absolute z-0 w-full lg:relative flex flex-col items-center justify-around h-scream lg:h-screen lg:w-1/2  ">
          {/* Aurora */}
          <Aurora  speed={1.5} />

          {/* Conteúdo principal */}
          <div className=" absolute flex flex-col justify-around h-screen items-center z-50 lg:shadow-left w-full lg:w-full ">
            <LogoBig />
          </div>
        </div>
      </div>
    </main>
  );
}
