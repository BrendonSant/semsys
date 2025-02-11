"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FiEdit, FiTrash } from "react-icons/fi";
import { CustomerProps } from "@/util/customer.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export function CardSupplier({ supplier }: { supplier: CustomerProps }) {

  const router = useRouter();

  async function handleDeleteSupplier() {
    try {
      const response = await api.delete(`/api/supplier`, {
        params: {
          id: supplier.id,
        },
      });
      console.log(response);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <Card>
    <CardHeader>
      <div className="flex justify-between px-1">
        <div></div>
        <FiEdit size={24} />
      </div>
    </CardHeader>
    <CardContent className="flex flex-col items-start md:items-start ">
      <div className="flex flex-col w-full ">
        <div className="font-montserrat font-bold w-full md:w-full ">
          Nome:{" "}
          <span className="font-sans font-normal"> {supplier.name}</span>
        </div>
        <div className="font-montserrat font-bold w-full">
          Email:{" "}
          <span className="font-sans font-normal">{supplier.email}</span>
        </div>
        <div className="font-montserrat font-bold w-full">
          Celular:{" "}
          <span className="font-sans font-normal">{supplier.phone}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <div className="flex justify-end w-full">
        <button onClick={handleDeleteSupplier}>
          <FiTrash size={24} color="red" />
        </button>
      </div>
    </CardFooter>
  </Card>
  )
}
