import Image from "next/image";
import heroImg from "../assets/hero.svg"

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-screen">
      <h1>Gerencie sua empresa</h1>
      <h1>Atendimentos, clientes</h1>
      <Image
      src={heroImg}
      alt='Imagem hero do dev controle'
      width={600}
      className="max-w-sm md:max-w-xl"
      />
    </main>
  );
}
