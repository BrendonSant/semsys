import { Container } from "@/components/container";
import { Button } from "@/components/ui/button"
import { FiUserPlus } from "react-icons/fi";


export default function Customers(){
    return(
        <Container>
             <div className="flex w-full mt-10 mb-4">
               <h1 className="text-3xl font-bold font-sans text-mdblue-500">Clientes</h1>
               <Button variant="outline">
                <FiUserPlus/>
                Cadastrar Cliente</Button>

             </div>
             
             
             
           </Container>
    )
}