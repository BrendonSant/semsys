"use cliente";

import { Controller, useForm, useWatch } from "react-hook-form";
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
  buscaProdutoID,
  buscaProdutos,
  buscarServiceID,
  editarService,
} from "@/app/servicing/newservicing/actions";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatorio!"),
  description: z.string().min(1, "O campo descrição é obrigatorio!"),
  serviceprice: z.string().min(1, "O campo preço do serviço é obrigatorio!"),
  payment: z.string().min(1, "Selecione um status de pagamento!"),
  status: z.string().min(1, "Selecione um status!"),
  customerId: z.string().min(1, "Selecione um cliente!"),
  productId: z.string().nullable(),
  supplierId: z.string().nullable(),
  total: z.string()
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

  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = servicer;

  const customerWatch = useWatch({ control, name: "customerId" });

  const statusWatch = useWatch({ control, name: "status" });

  const paymentWatch = useWatch({ control, name: "payment" });

  const productWatch = useWatch({ control, name: "productId" });

  const suppliersWatch = useWatch({ control, name: "supplierId" });

  const servicepriceWatch = useWatch({ control, name: "serviceprice" });

 
  

  useEffect(() => {
    if (customerWatch) {
      setValue("customerId", customerWatch);
    }
  }, [customerWatch]);

  useEffect(() => {
    if (statusWatch) {
      setValue("status", statusWatch);
    }
  }, [statusWatch]);


  useEffect(() => {
    if (paymentWatch) {
      setValue("payment", paymentWatch);
    }
  }, [paymentWatch]);


  useEffect(() => {
    if (productWatch) {
      setValue("productId", productWatch);
    }
  }, [productWatch]);


  useEffect(() => {
    if (suppliersWatch) {
      setValue("supplierId", suppliersWatch);
    }
  }, [suppliersWatch]);


  const { data: dataProdutoID } = useQuery({
    queryKey: ["busca_produtos", userId,productWatch],
    queryFn: () => productWatch ? buscaProdutoID(userId, productWatch) : Promise.resolve(null),
    enabled: !!id, // Só executa a query se `id` for válido
  });

  

  useEffect(() => {
   
    
  
    const productPrice = parseFloat(dataProdutoID?.price ?? "0");
    const servicePrice = parseFloat(servicepriceWatch) || 0;
    // Calcula o total
   
  
    const totalValue = servicePrice + productPrice;
  
    // Atualiza o campo "total" com o novo valor
    setValue("total", totalValue.toString());
  }, [servicepriceWatch, productWatch, setValue]);

  


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
              <div className="flex flex-col w-full gap-6 px-2">
                <div className="flex flex-col w-full ">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Titulo do Serviço:
                  </label>
                  <Input
                    placeholder="Digie o titulo do serviço"
                    type="text"
                    name="name"
                    error={errors.name?.message}
                    register={servicer.register}
                  />
                </div>

                <div className="flex flex-col w-full ">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Selecione o cliente:
                  </label>
                  <Controller
                    name="customerId"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <Select
                        value={field.value ?? undefined}
                        
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger   id="customerId">
                          <SelectValue placeholder={"Seleciona..."} />
                        </SelectTrigger>
                        <SelectContent>
                          {customers &&
                            customers.map(
                              (customer: { id: string; name: string }) => (
                                <SelectItem
                                  key={customer.id}
                                  value={customer.id}
                                >
                                  {customer.name}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col  mt-4 px-2">
                {/* Campo Valor do Serviço */}
                <div className="flex flex-col w-full ">
                  <label className="mb-1 font-medium text-lg" htmlFor="value">
                    Valor do serviço:
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
                <label className="mb-1 font-medium text-lg" htmlFor="status">
                    Selecione o status do pagamento:
                  </label>
                <Controller
                    name="payment"
                    control={control}
                    defaultValue={"Pendente"}
                    render={({ field }) => (
                      <Select
                        value={field.value ?? undefined}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger id="payment">
                          <SelectValue placeholder={"Seleciona..."} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Realizado">Realizado</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                {/* Campo Status */}
                <div className="flex flex-col w-full ">
                  <label className="mb-1 font-medium text-lg" htmlFor="status">
                    Selecione o status:
                  </label>

                  <Controller
                    name="status"
                    control={control}
                    defaultValue={"Não iniciado"}
                    render={({ field }) => (
                      <Select
                        value={field.value ?? undefined}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder={"Seleciona..."} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Realizado">Realizado</SelectItem>
                          <SelectItem value="Parado">Parado</SelectItem>
                          <SelectItem value="Executando">Executando</SelectItem>
                          <SelectItem value="Não iniciado">Não iniciado</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col  w-full  gap-6 mt-4 px-2">
                <div className="flex flex-col w-full ">

                   {/* Campo produto */}
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Selecione o produto:
                  </label>
                  <Controller
                    name="productId"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <Select
                        value={field.value ?? undefined}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger id="productId">
                          <SelectValue placeholder={"Seleciona..."} />
                        </SelectTrigger>
                        <SelectContent>
                          {products && products.map((product: {id:string; name:string}) =>(
                            <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                          ))}
                          
                      
                        </SelectContent>
                      </Select>
                    )}
                  />
                  
                </div>

                <div className="flex flex-col w-full">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Selecione o fornecedor:
                  </label>
                   {/* Campo fornecedor */}
                   <Controller
                    name="supplierId"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <Select
                        value={field.value ?? undefined}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger id="supplierId">
                          <SelectValue placeholder={"Seleciona..."} />
                        </SelectTrigger>
                        <SelectContent>
                          {suppliers && suppliers.map((supplier: {id:string; name:string}) =>(
                            <SelectItem key={supplier.id} value={supplier.id}>{supplier.name}</SelectItem>
                          ))}
                        
                        </SelectContent>
                      </Select>
                    )}
                  />

                </div>
              </div>
              <div className="px-2 mt-4">
              <label className="mb-1 font-medium text-lg mt-4" htmlFor="">
                Descrição
              </label>
              <textarea
                className="w-full border border-gray-300 px-2 rounded-md h-24 mb-2"
                placeholder="Descreva o serviço"
                {...servicer.register("description")}
              ></textarea>
              </div>

              
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
