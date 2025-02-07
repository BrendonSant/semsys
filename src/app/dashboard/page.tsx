import { Container } from "@/components/container";
import { TabDashboard } from "@/components/dashboard/tabdashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user){
    redirect('/')
  }
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
          <TabsTrigger value="password">Relatorios</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="account">
          <TabDashboard/>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </Container>
  );
}
