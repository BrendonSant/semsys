import { Container } from "@/components/container";
import { TabDashboard } from "@/components/dashboard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";
import { Reports } from "@/components/reports/reports";
import {MyBarChart} from "@/components/chart/charts";

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user){
    redirect('/')
  }

 

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id
    }
  });



  const userId = session.user.id
 

  return (
    <Container>
      <div className="flex w-full mt-10 mb-6">
        <h1 className="text-3xl font-bold font-sans text-mdblue-500">
          DashBoard
        </h1>
      </div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Dashboard</TabsTrigger>
          <TabsTrigger value="reports">Relatorios</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="account">
          <TabDashboard/>
          <MyBarChart userId={userId}/>
        </TabsContent>
        <TabsContent value="reports">
         <Reports customers={customers}/>
        </TabsContent>
      </Tabs>
      
    </Container>
  );
}
