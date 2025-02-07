import { CardInfo } from "@/components/card/card";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button"
import { FiUserPlus } from "react-icons/fi";


export default function Customers(){
    return(
        <Container>
             <div className="flex w-full justify-between  mt-10 mb-4">
               <h1 className="text-3xl font-bold font-sans text-mdblue-500">Clientes</h1>
               <Button variant="outline">
                <FiUserPlus/>
                Cadastrar Cliente</Button>

             </div>

             <div className="flex flex-col md:flex-row w-full gap-2">
              <CardInfo/>
              <CardInfo/>
              <CardInfo/>
             </div>
             
             
             
           </Container>
    )
}