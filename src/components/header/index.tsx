import Link from "next/link"
import {FiUser,FiLogOut} from "react-icons/fi"

export function Header(){
    return(
        <header className="w-full flex itens-center px-2 py-4 bg-white h-20 shadow-sm">
            <div className="w-full flex itens-center justify-between max-w-7xl mx-auto">
                <Link href="/">
                <h1 className="font font-bold text-2xl pl-1 hover:tracking-widest">
                    <span className="text-blue-500">DEV</span> CONTROLE
                </h1>
                </Link>
                
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