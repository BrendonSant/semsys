import Image from "next/image";
import heroImg from "../assets/hero.svg";

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)] ">
    
      <div className="flex items-center gap-10 flex-col lg:flex-row lg:justify-around  justify-center w-full lg:max-w-screen-2xl">
        <div>
        <h1 className="font-bold text-3xl md:text-4xl text-blue-500">
        Gerencie sua empresa
      </h1>
      <h3 className="font-semibold text-xl md:text-4xl">
        Atendimentos, clientes
      </h3>
        </div>
        <Image
          src={heroImg}
          alt="Imagem hero do dev controle"
          width={600}
          className="max-w-sm md:max-w-xl"
        />
      </div>
    </main>
  );
}
