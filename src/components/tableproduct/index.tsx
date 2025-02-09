'use client'

import { ProductProps } from "@/util/product.type"
import { useRouter } from "next/navigation";
import { FiEdit, FiTrash } from "react-icons/fi";
import { api } from "@/lib/api";



export function TableProduct({ product  }: { product: ProductProps }) {
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
    return(
        <>
        <tr className="text-left h-16 border-b-2 border-b-slate-200 last:border-b-0" key={product.id}>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.description}</td>
        <td className="text-right">
          <div className="flex justify-end gap-2">
          <button >
          <FiEdit color='#072e5a'size={24}/>
          </button>
          <button onClick={handleDeleteSProduct}>
          <FiTrash color="red" size={24}/>
          </button>
          </div>
          
          
        </td>
      </tr>
        </>
        
    )
}