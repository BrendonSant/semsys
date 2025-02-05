import Link from "next/link"
import {FiUser,FiLogOut} from "react-icons/fi"

export function Header(){
    return(
        <header className="w-full flex itens-center px-4 py-4 bg-white h-20 shadow-sm ">
            <div className="w-full flex my-auto itens-center justify-between max-w-[1920px] mx-auto">
                <Link href="/">
                <h1 className="font font-bold text-2xl pl-1 hover:tracking-widest text-mdblue-500">
                    semsys
                </h1>
                </Link>
                <div className="flex gap-6">
                    
                <Link href={"/dashboard"}>
                    <span className="text-mdblue-500">Dashboard</span>
                </Link>
                <Link href={"/services"}>
                    <span className="text-mdblue-500">Serviços</span>
                </Link>
                <Link href={"/customers"}>
                    <span className="text-mdblue-500">Clientes</span>
                </Link>
                <Link href={"/suplliers"}>
                    <span className="text-mdblue-500">Fornecedores</span>
                </Link>
                <Link href={"/product"}>
                    <span className="text-mdblue-500">Produtos</span>
                </Link>
                </div>
                
                <div className="flex itens-baseline gap-4">
                <Link href={"/dashboard"}>
                    <FiUser size={26} color=""/>
                </Link>

                <Link href={"/"}>
                    <FiLogOut size={26} color=""/>
                </Link>
                </div>
            </div>
        </header>
    )
}