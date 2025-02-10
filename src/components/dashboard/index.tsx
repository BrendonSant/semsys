import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Avatar from "@/assets/avatar.png";
import { FiDollarSign } from "react-icons/fi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

export async function TabDashboard() {

const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const usernow = await prismaClient.user.findMany({
    where: {
      id: session.user.id,
      image: session.user.image
      
    },
  });



  return (
    <div className="flex flex-col lg:flex-row mt-8 w-full justify-between gap-6 lg:gap-8">
      <Card className="w-full  lg:w-1/2 flex items-center justify-between ">
        <div className="flex items-center py-4 px-8 ">
          <div>
            <Image src={session.user.image || Avatar}
             alt="Avatar user" height={52} width={52}
              className="rounded-full object-cover"
             />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-montserrat font-bold">
              {session.user.name}
            </CardTitle>
            <CardDescription className="font-montserrat">{session.user.email}</CardDescription>
          </CardHeader>
        </div>
        <div className="flex flex-col items-center justify-center px-8">
          <h2 className="font-montserrat font-bold text-2xl w-auto">
            seja bem
          </h2>
          <h2 className="font-montserrat font-bold text-2xl">vindo</h2>
        </div>
      </Card>

      <div className="flex justify-between w-full lg:w-2/4 mt-4 lg:mt-0 gap-2 md:gap-4 ">
        <Card className="w-1/2  px-6">
          <CardHeader className="flex flex-row justify-between w-full px-4">
            <CardTitle className="text-sm font-montserrat font-medium">
              Vendas
            </CardTitle>
            <FiDollarSign />
          </CardHeader>
          <CardDescription className="font-montserrat font-bold text-2xl px-4 text-black">
            R$2000,00
          </CardDescription>
          <CardFooter>+5% acima do mês anterior</CardFooter>
        </Card>

        <Card className="w-1/2  px-6">
          <CardHeader className="flex flex-row justify-between w-full px-4">
            <CardTitle className="text-sm font-montserrat font-medium">
              Vendas
            </CardTitle>
            <FiDollarSign />
          </CardHeader>
          <CardDescription className="font-montserrat font-bold text-2xl px-4 text-black">
            R$2000,00
          </CardDescription>
          <CardFooter>+5% acima do mês anterior</CardFooter>
        </Card>
      </div>
    </div>
  );
}
