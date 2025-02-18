"use cliente";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useEffect } from "react";
import { Container } from "@/components/container";
import { ServiceProps } from "@/util/servicing.type";
import {
  buscaClientes,
  buscaFornecedores,
  buscaProdutos,
  buscarServiceID,
  editarService,
} from "@/app/servicing/newservicing/actions";
import { ScrollArea } from "@/components/ui/scroll-area";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatorio!"),
  description: z.string().min(1, "O campo descrição é obrigatorio!"),
  serviceprice: z.string().min(1, "O campo preço do serviço é obrigatorio!"),
});

type FormData = z.infer<typeof schema>;

export function ServiForm({
  userId,
  id,
  onClose,
}: {
  id: string | null;
  userId: string | null;
  onClose: () => void;
}) {
  const isInsert = !!id;

  const queryClient = useQueryClient();

  const { data: dataCustomer } = useQuery({
    queryKey: ["busca_clientes", userId],
    queryFn: () => buscaClientes(userId),
    enabled: !!id, // Só executa a query se `id` for válido
  });

  const { data: dataProduto } = useQuery({
    queryKey: ["busca_produtos", userId],
    queryFn: () => buscaProdutos(userId),
    enabled: !!id, // Só executa a query se `id` for válido
  });

  const { data: dataFornecedores } = useQuery({
    queryKey: ["busca_fornecedores", userId],
    queryFn: () => buscaFornecedores(userId),
    enabled: !!id, // Só executa a query se `id` for válido
  });

  const { data: dataService, isFetching: isFetchingService } = useQuery({
    queryKey: ["service_select", id],
    queryFn: () => buscarServiceID(id, userId),
    enabled: !!id, // Só executa a query se `id` for válido
  });

  const servicer = useForm<ServiceProps>({
    defaultValues: {
      id: "",
      name: "",
      description: "",
      payment: "Pendente",
      status: "Não iniciado",
      create_at: null,
      update_at: null,
      serviceprice: "",
      total: "",
      customerId: "",
      supplierId: "",
      productId: "",
      userId,
    },
    resolver: zodResolver(schema),
  });

  const { data: customers } = useQuery({
    queryKey: ["busca_clientes", userId],
    queryFn: () => buscaClientes(userId),
    enabled: !!userId,
  });

  const { data: products } = useQuery({
    queryKey: ["busca_produtos", userId],
    queryFn: () => buscaProdutos(userId),
    enabled: !!userId,
  });

  const { data: suppliers } = useQuery({
    queryKey: ["busca_fornecedores", userId],
    queryFn: () => buscaFornecedores(userId),
    enabled: !!userId,
  });


  const { mutateAsync: editServiceFn } = useMutation({
      mutationKey: ["editar_serviço"],
      mutationFn: (data: ServiceProps) => editarService(data, id, userId),
      onSuccess: async (response) => {
        console.log("Cliente editado!");
        alert("Cliente editado com sucesso!");
        router.refresh();
        
        onClose();
      },
    });

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = servicer;

  const router = useRouter();

  async function handleRegisterService(data: ServiceProps) {
    if (id) {
      console.log(data);
       editServiceFn(data);
    } else {
      await api.post("/api/servicing", {
        name: data.name,
        descriptio: data.description,
        payment: data.payment,
        status: data.status,
        serviceprice: data.serviceprice,
        total: data.total,
        customerId: data.customerId,
        supplierId: data.supplierId,
        productId: data.productId,
        userId: userId,
      });

      router.refresh();

      onClose();
    }
  }

  useEffect(() => {
    if (dataService) {
      servicer.reset(dataService as ServiceProps);
    }
  }, [dataService]);

  return (
    <Container>
      <div className="mt-10 ">
        <div className="w-full flex flex-col">
          <form
            onSubmit={handleSubmit(handleRegisterService)}
            className="w-full flex flex-col"
          >
            <ScrollArea className="px-4 overflow-y-auto h-[calc(100vh-15rem)]">
           
              <div className="flex flex-col w-full gap-6">
                <div className="flex flex-col w-full ">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Titulo do Serviço
                  </label>
                  <Input
                    placeholder="Digie o titulo do serviço"
                    type="text"
                    name="name"
                    error={errors.name?.message}
                    register={servicer.register}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Selecione o cliente
                  </label>
                  <select
                    {...servicer.register("customerId")}
                    className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2"
                  >
                    {customers &&
                      customers.map(
                        (customer: { id: string; name: string }) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        )
                      )}
                  </select>
                </div>
              </div>

              <div className="w-full flex flex-col  mt-4">
                {/* Campo Valor do Serviço */}
                <div className="flex flex-col w-full ">
                  <label className="mb-1 font-medium text-lg" htmlFor="value">
                    Valor do serviço
                  </label>
                  <Input
                    placeholder="Digite o título do serviço"
                    type="text"
                    name="serviceprice"
                    error={errors.serviceprice?.message}
                    register={servicer.register}
                  />
                </div>

                {/* Campo Status de Pagamento */}
                <div className="flex flex-col w-full ">
                  <label className="mb-1 font-medium text-lg" htmlFor="payment">
                    Selecione o status pagamento
                  </label>
                  <select
                    defaultValue={"Pendente"}
                    {...servicer.register("payment")}
                    className="w-full border border-gray-300 px-2 rounded-md h-11 mb-4"
                  >
                    <option value="Realizado">Realizado</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                </div>

                {/* Campo Status */}
                <div className="flex flex-col w-full ">
                  <label className="mb-1 font-medium text-lg" htmlFor="status">
                    Selecione o status
                  </label>
                  <select
                    defaultValue={"Não iniciado"}
                    {...servicer.register("status")}
                    className="w-full border border-gray-300 px-2 rounded-md h-11"
                  >
                    <option value="Realizado">Realizado</option>
                    <option value="Parado">Parado</option>
                    <option value="Executando">Executando</option>
                    <option value="Não iniciado">Não iniciado</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col  w-full  gap-6 mt-4">
                <div className="flex flex-col w-full ">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Selecione o produto
                  </label>
                  <select
                    className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2"
                    {...servicer.register("productId")}
                  >
                    <option value="">Nenhum produto</option>{" "}
                    {/* Opção para campo vazio */}
                    {products &&
                      products.map((product: { id: string; name: string }) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex flex-col w-full">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Selecione o fornecedor
                  </label>
                  <select
                    {...servicer.register("supplierId")}
                    className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2"
                  >
                    <option value="">Nenhum produto</option>{" "}
                    {/* Opção para campo vazio */}
                    {suppliers &&
                      suppliers.map(
                        (supplier: { id: string; name: string }) => (
                          <option key={supplier.id} value={supplier.id}>
                            {supplier.name}
                          </option>
                        )
                      )}
                  </select>
                </div>
              </div>

              <label className="mb-1 font-medium text-lg mt-4" htmlFor="">
                Descrição
              </label>
              <textarea
                className="w-full border border-gray-300 px-2 rounded-md h-24 mb-2"
                placeholder="Descreva o serviço"
                {...servicer.register("description")}
              ></textarea>
            </ScrollArea>

            <div className="flex mt-10">
              <button
                type="submit"
                className=" bg-mdblue-500 w-full md:w-full  text-white font-montserrat font-bold rounded-sm h-11 mt-4 "
              >
                Lançar serviço
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
