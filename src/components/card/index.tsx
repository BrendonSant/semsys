'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FiEdit, FiTrash } from "react-icons/fi";
import { CustomerProps } from "@/util/customer.type";

export function CardInfo({customer}:{customer:CustomerProps}) {

  async function handleDeleteCustomer(){
    await fetch(`/api/customer/${customer.id}`,{
      method: 'DELETE'
    })
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between px-1">
            <div>
           
            </div>
            <FiEdit/>
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
              <span className="font-sans font-normal">
                {customer.email}
              </span>
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
              <FiTrash/>
              </button>
               
            </div>
        </CardFooter>
      
    </Card>
  );
}
