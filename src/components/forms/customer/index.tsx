"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buscarClienteID, editarCustomer } from "@/app/customers/actions";
import { CustomerProps } from "@/util/customer.type";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatorio!"),
  email: z
    .string()
    .email("Digite um email valido!")
    .min(1, "O email é um campo obrigatorio!"),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}&/.test(value)
      );
    },
    {
      message: "O número do telefone deve seguir o padrão (DD) 999999999. ",
    }
  ),
  document: z.string().min(11, "O campo nome é obrigatorio!"),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm({
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

  const { data: dataCliente, isFetching: isFetchingCliente } = useQuery({
    queryKey: ["cliente_select", id],
    queryFn: () => buscarClienteID(id, userId),
    enabled: !!id, // Só executa a query se `id` for válido
  });

 

  const customer = useForm<CustomerProps>({
    defaultValues: {
      id: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      document: "",
      create_at: null,
      update_at: null,
      userId,
    },
    resolver: zodResolver(schema),
  });

  const { mutateAsync: editCustomerFn } = useMutation({
    mutationKey: ["editar_cliente"],
    mutationFn: (data: CustomerProps) => editarCustomer(data, id, userId),
    onSuccess: async (response) => {
      console.log("Cliente editado!");
      alert("Cliente editado com sucesso!");
      router.refresh();
      
      onClose();
    },
  });

  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = customer;

  const router = useRouter();

  useEffect(() => {
    if (dataCliente) {
      customer.reset(dataCliente);
    }
  }, [dataCliente]);

  async function handleRegisterCustomer(data: CustomerProps) {
    if (id) {
      editCustomerFn(data);
    } else {
      await api.post("/api/customer", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        document: data.document,
        address: data.address,
        userId: userId,
      });

      router.refresh();
      
      onClose();
    }
  }

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit(handleRegisterCustomer)}
    >
      <label className="mt-3">Nome do Cliente: </label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo."
        error={errors.name?.message}
        register={customer.register}
      />
      <label className="mt-3">Email: </label>
      <Input
        type="email"
        name="email"
        placeholder="Digite um email valido."
        error={errors.email?.message}
        register={customer.register}
      />
      <label className="mt-3">Celular: </label>
      <Input
        type="text"
        name="phone"
        placeholder="Digite o número do celular"
        error={errors.phone?.message}
        register={customer.register}
      />
      <label className="mt-3">Documento: </label>
      <Input
        type="number"
        name="document"
        placeholder="Digite o CPF"
        error={errors.document?.message}
        register={customer.register}
      />
      <label className="mt-3">Endereço </label>
      <Input
        type="text"
        name="address"
        placeholder="Digite o número do celular"
        error={errors.address?.message}
        register={customer.register}
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
