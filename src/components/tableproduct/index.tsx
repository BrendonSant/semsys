"use client";

import { ProductProps } from "@/util/product.type";
import { useRouter } from "next/navigation";
import { FiEdit, FiTrash } from "react-icons/fi";
import { api } from "@/lib/api";
import { SheetCustomer } from "../sheet";


export function TableProduct({ product }: { product: ProductProps }) {
 
  const router = useRouter();
 


  async function handleDeleteSProduct() {
    try {
      const response = await api.delete(`/api/product`, {
        params: {
          id: product.id,
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
      <tr
        className="text-left h-16 border-b-2 border-b-slate-200 last:border-b-0"
        key={product.id}
      >
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.description}</td>
        <td className="text-right">
          <div className="flex justify-end gap-2">
          <SheetCustomer userId={product.userId} id={product.id} title='Edite o produto' type='product' buttonname={''}  icon={<FiEdit color="blue"/>}  />
            <button onClick={handleDeleteSProduct}>
              <FiTrash color="red" size={18} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
