"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomerProps } from "@/util/customer.type";
import { useEffect } from "react";
import { buscarFornecedorID, editarForncedor } from "@/app/suppliers/actions";

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
        /^\d{11}/.test(value)
      );
    },
    {
      message: "O número do telefone deve seguir o padrão (DD) 999999999. ",
    }
  ),
  document: z.string().min(14, "O campo nome é obrigatorio!"),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function SupplierForm({
  userId,
  onClose,
  id,
}: {
  userId: string | null;
  onClose: () => void;
  id: string | null;
}) {
  const isInsert = !!id;

  const queryClient = useQueryClient();

  const { data: dataFornecedor, isFetching: isFetchingCliente } = useQuery({
    queryKey: ["cliente_select", id],
    queryFn: () => buscarFornecedorID(id, userId),
    enabled: !!id, // Só executa a query se `id` for válido
  });

  const supplier = useForm<CustomerProps>({
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

  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = supplier;

  const { mutateAsync: editSupplierFn } = useMutation({
    mutationKey: ["editar_fornecedor"],
    mutationFn: (data: CustomerProps) => editarForncedor(data, id, userId),
    onSuccess: async (response) => {
      console.log("Cliente editado!");
      alert("Cliente editado com sucesso!");
      router.refresh();
      
      onClose();
    },
  });

  const router = useRouter();

  async function handleRegisterSupplier(data: CustomerProps) {
    if (id) {
      editSupplierFn(data);
    } else {
      await api.post("/api/supplier", {
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

  useEffect(() => {
    if (dataFornecedor) {
      supplier.reset(dataFornecedor);
    }
  }, [dataFornecedor]);

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit(handleRegisterSupplier)}
    >
      <label className="mt-3">Nome do Fornecedor:</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo."
        error={errors.name?.message}
        register={supplier.register}
      />
      <label className="mt-3">Email: </label>
      <Input
        type="email"
        name="email"
        placeholder="Digite um email valido."
        error={errors.email?.message}
        register={supplier.register}
      />
      <label className="mt-3">Celular: </label>
      <Input
        type="text"
        name="phone"
        placeholder="Digite o número do celular"
        error={errors.phone?.message}
        register={supplier.register}
      />
      <label className="mt-3">Documento: </label>
      <Input
        type="number"
        name="document"
        placeholder="Digite o CPF"
        error={errors.document?.message}
        register={supplier.register}
      />
      <label className="mt-3">Endereço </label>
      <Input
        type="text"
        name="address"
        placeholder="Digite o número do celular"
        error={errors.address?.message}
        register={supplier.register}
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
