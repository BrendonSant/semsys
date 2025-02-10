import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from '@/lib/prisma'



export async function ServiForm() {

  const session = await getServerSession(authOptions);

  if(!session || !session.user){
    redirect('/')
  }

  const customers = await prismaClient.customer.findMany({
    where:{
      userId: session.user.id
    }
  })
  
  return (
    <div className="w-full flex flex-col">
      <form className="w-full flex flex-col">
        <label className="mb-1 font-medium text-lg" htmlFor="">
          Titulo do Serviço
        </label>
        <input
          className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2"
          placeholder="Digie o titulo do serviço"
          type="text"
          required
        />
        <label className="mb-1 font-medium text-lg" htmlFor="">
          Selecione o cliente
        </label>
        <select className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2">
            {customers.map(customers =>(
                <option key={customers.id} 
                value={customers.id}>{customers.name}</option>
            ))}
        </select>

        <label className="mb-1 font-medium text-lg" htmlFor="">
          Valor do serviço
        </label>
        <input
          className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2"
          placeholder="Digie o titulo do serviço"
          type="text"
          required
        />

        <label className="mb-1 font-medium text-lg" htmlFor="">
          Descrição
        </label>
        <textarea
          className="w-full border border-gray-300 px-2 rounded-md h-24 mb-2"
          placeholder="Descreva o serviço"
          required
        ></textarea>
        
        

        <label className="mb-1 font-medium text-lg" htmlFor="">
          Selecione o status pagamento
        </label>
        <select 
        
        defaultValue={'Pendente'}
        className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2">
            
            <option value="Realizado">Realizado</option>
            <option value="Pendente">Pendente</option>
        </select>

        <label className="mb-1 font-medium text-lg" htmlFor="">
          Selecione o status
        </label>
        <select 
        defaultValue={'Não iniciado'}
        className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2">
            <option value="Realizado">Realizado</option>
            <option value="Parado">Parado</option>
            <option value="Execultando">Execultando</option>
            <option value="Não iniciado">Não iniciado</option>
        </select>
    
      </form>
    </div>
  );
}
