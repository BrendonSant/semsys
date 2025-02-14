"use client";

import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ProductProps } from "@/util/product.type";
import { useEffect } from "react";
import { buscarProdutoID} from "@/app/products/actions";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatorio!"),
  price: z.string().min(1, "O campo preço é obrigatorio!"),
  description: z.string(),
});

type FormData = z.infer<typeof schema>;

export function ProductForm({
  id,
  userId,
  onClose,
}: {
  id: string | null;
  userId: string | null;
  onClose: () => void;
}) {

  const isInsert = !(!id) ; 
  

  console.log(isInsert);

  const queryClient = useQueryClient();

 

  const { data: dataProduto, isFetching: isFetchingProduto } = useQuery({
    queryKey: ["produto_select", id],
    queryFn: () => buscarProdutoID(id,userId),
    enabled: !!id, // Só executa a query se `id` for válido
  });


  
  
  

  console.log(dataProduto);
const  produtos = useForm<ProductProps>({
  defaultValues: {
    id:"",
    name:'',
    price:'',
    description:'',
    userId,
  },
  resolver: zodResolver(schema),
});

const {
  setValue,
  getValues,
  handleSubmit,
  formState: { errors },
} = produtos


  

  const router = useRouter();





  async function handleRegisterProduct(data: ProductProps) {

  
      await api.post("/api/product", {
        name: data.name,
        price: data.price,
        description: data.description,
        userId: userId,
      });
  
      router.refresh();
      router.replace("/products");
      onClose();

    }
  
    
  

  useEffect(() => {
    if (dataProduto) {
      produtos.reset(dataProduto);
    }
  }, [dataProduto])


  return (
    
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit(handleRegisterProduct)}
    >
      <label className="mt-3">Nome do produto:</label>
      <Input
        type="text"
       
        placeholder="Digite o nome do produto."
        error={errors.name?.message}
        name="name"
        register={produtos.register}
        
      />
      <label className="mt-3">Valor</label>
      <Input
        type="money"
        name="price"
        placeholder="Digite o valor do produto."
        error={errors.price?.message}
        register={produtos.register}
      />
      <label className="mt-3">Descrição</label>
      <Input
        type="text"
        name="description"
        placeholder="Digite a descrição do produto."
        error={errors.description?.message}
        register={produtos.register}
      />

      <button
        className="bg-mdblue-500 my-4 px-2 h-11 rounded-sm text-white font-montserrat font-bold hover:bg-mblue-500 transition-all duration-500"
        type="submit"
      >
        Salvar
      </button>
    </form>
  );
}
