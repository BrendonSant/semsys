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

export function CardInfo({ customer }: { customer: CustomerProps }) {

  const router = useRouter();

  async function handleDeleteCustomer() {
    try {
      const response = await api.delete(`/api/customer`, {
        params: {
          id: customer.id,
        },
      });
      console.log(response);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between px-1">
          <div></div>
          <FiEdit />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-start md:items-start ">
        <div className="flex flex-col w-full ">
          <div className="font-montserrat font-bold w-full md:w-full ">
            Nome:{" "}
            <span className="font-sans font-normal"> {customer.name}</span>
          </div>
          <div className="font-montserrat font-bold w-full">
            Email:{" "}
            <span className="font-sans font-normal">{customer.email}</span>
          </div>
          <div className="font-montserrat font-bold w-full">
            Celular:{" "}
            <span className="font-sans font-normal">{customer.phone}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end w-full">
          <button onClick={handleDeleteCustomer}>
            <FiTrash />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
