'use client'
import LayoutApp from "@/components/shared/LayoutApp/page";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Component() {
  
  const Entrar = () =>  {

    return  redirect("/cadastro")
  }

  return (
    <LayoutApp >
        <div className="flex flex-col items-center justify-center h-screen"> 
            <div className="w-96 text-center text-2xl h-auto rounded-t-xl bg-blue-700 p-3 text-white font-bold">
                Login
            </div>

            <div className="w-96 h-auto bg-blue-500 p-10 rounded-b-xl">
                <form className="flex flex-col gap-3">
                  <input 
                    type="text" placeholder="E-mail" 
                    className="outline-none p-3 rounded-md text-md text-black font-bold h-10" 
                  />
                  <input className="outline-none p-3 rounded-md text-md text-black font-bold" type="password" placeholder="Senha" />
                  <button 
                    onClick={Entrar}
                    className="p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700" 
                    >Entrar</button>
                  <Link 
                      href="/cadastro" 
                      className="p-3 rounded-md bg-slate-600 text-white hover:bg-slate-500 text-center"
                  > Cadastrar </Link>
                </form>
            </div>
        </div>
    </LayoutApp>
  );
}
