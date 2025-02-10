import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";
import { Container } from "@/components/container";


export default async function NewServices() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const supplier = await prismaClient.supplier.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const product = await prismaClient.product.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegisterTicket(formData:FormData){
    'use server'

    const name = formData.get('name')
    const description = formData.get('description')
    const customer = formData.get('customer')
    const value = formData.get('value')
    const payment = formData.get('payment')
    const status = formData.get('status')
    const product = formData.get('product')
    const supplier = formData.get( 'supplier')

    // Inicialize o total
  let total = Number(value);

  // Se um produto foi selecionado, busque seu valor
  if (product) {
    const productData = await prismaClient.product.findUnique({
      where: { id: product as string },
      select: { price: true }, // Supondo que o preço do produto está armazenado em "price"
    });

    if (productData && productData.price) {
      total += Number(productData.price); // Adicione o preço do produto ao total
    }
  }
    

    

    if(!name || !description || !customer || !value || !payment || !status){
      return;
    }

    await prismaClient.ticket.create({
      data:{
        name: name as string,
        description: description as string,
        customerId: customer as string,
        serviceprice: value as string,
        payment: payment as string,
        status: status as string,
        productId: product as string | null,
        supplierId: supplier as string | null,
        total: total.toFixed(2).toString(),
        userId: session?.user.id

      }
    })
  }

  return (
    <>
      <Container>
        <div className="mt-10">
          <div className="w-full flex flex-col">
            <form 
            action={handleRegisterTicket}
            className="w-full flex flex-col">
              <div className="flex flex-col w-full md:flex-row gap-6">
                <div className="flex flex-col w-full md:w-1/2">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Titulo do Serviço
                  </label>
                  <input
                    className="w-full border border-gray-300 px-2 rounded-md h-11"
                    placeholder="Digie o titulo do serviço"
                    type="text"
                    required
                    name="name"
                  />
                </div>

                <div className="flex flex-col w-full md:w-1/2">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Selecione o cliente
                  </label>
                  <select
                  name="customer"
                   className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2">
                    {customers.map((customers) => (
                      <option key={customers.id} value={customers.id}>
                        {customers.name}
                      </option>
                    ))}
                    
                  </select>
                </div>
              </div>

              <div className="w-full md:flex flex-col gap-6">
                <div className="flex flex-col w-full md:w-1/3">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Valor do serviço
                  </label>
                  <input
                    className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2"
                    placeholder="Digie o titulo do serviço"
                    type="text"
                    required
                    name="value"
                  />
                </div>

                <div className="flex flex-col w-full md:w-1/3">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Selecione o status pagamento
                  </label>
                  <select
                    name="payment"
                    defaultValue={"Pendente"}
                    className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2"
                  >
                    <option value="Realizado">Realizado</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                </div>

                <div className="flex flex-col w-full md:w-1/3">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Selecione o status
                  </label>
                  <select
                  name="status"
                    defaultValue={"Não iniciado"}
                    className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2"
                  >
                    <option value="Realizado">Realizado</option>
                    <option value="Parado">Parado</option>
                    <option value="Execultando">Execultando</option>
                    <option value="Não iniciado">Não iniciado</option>
                  </select>
                </div>
              </div>

              <div>
              <div className="flex flex-col w-full md:w-1/2">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Selecione o produto
                  </label>
                  <select
                  name="product"
                   className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2">
                    <option value="">Nenhum produto</option> {/* Opção para campo vazio */}
                    {customers.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                    
                  </select>
                </div>

                <div className="flex flex-col w-full md:w-1/2">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Selecione o fornecedor
                  </label>
                  <select
                  name="supplier"
                   className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2">
                    <option value="">Nenhum produto</option> {/* Opção para campo vazio */}
                    {customers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                    
                  </select>
                </div>
              </div>

              <label className="mb-1 font-medium text-lg" htmlFor="">
                Descrição
              </label>
              <textarea
                className="w-full border border-gray-300 px-2 rounded-md h-24 mb-2"
                placeholder="Descreva o serviço"
                required
                name="description"
              ></textarea>

              <button className=" bg-mdblue-500 w-full md:w-full lg:w-3/4 text-white font-montserrat font-bold rounded-sm h-11 mt-4">
                Lançar serviço
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
