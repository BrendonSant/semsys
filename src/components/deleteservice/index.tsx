"use client";

import { FiTrash } from "react-icons/fi";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { ServiceProps } from "@/util/servicing.type";

export function DeleteService({service}: {service:string}) {

    const router = useRouter();

  async function handleDeleteService() {
    try {
      const response = await api.delete(`/api/servicing`, {
        params: {
          id: service,
        },
      });
      console.log(response);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <button onClick={handleDeleteService}>
        <FiTrash color="red" size={16} />
      </button>
    </>
  );
}
