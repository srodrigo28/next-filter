'use client'

import LayoutApp from "@/components/shared/LayoutApp/page";
import Link from "next/link";
import { useState } from "react";

export default function Component() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleEmailIsValid = (e:any) => {
    if(!email){
      alert("Preencher o email ");
      return false;
    }else if(!password){
      alert("Preencher a senha ");
      return false;
    }else{
      alert("Sucesso " + email);
      return false;
    }
    Entrar;
  }
  
  const Entrar = () =>  {
    alert(" Carregando ...")
  }

  return (
    <LayoutApp >
        <div className="flex flex-col items-center justify-center h-screen"> 
            <div className="w-96 text-center text-2xl h-auto rounded-t-xl bg-blue-700 p-3 text-white font-bold">
                Login
            </div>

            <div className="w-96 h-auto bg-blue-500 p-10 rounded-b-xl">
                <form className="flex flex-col gap-3" onSubmit={handleEmailIsValid}>
                  <input 
                    className="outline-none p-3 rounded-md text-md text-black font-bold h-10" 
                    type="text" placeholder="E-mail" value={email} onChange={ e => setEmail(e.target.value)}
                  />
                  <input 
                    className="outline-none p-3 rounded-md text-md text-black font-bold"
                    type="password" placeholder="Senha" value={password} onChange={ e => setPassword(e.target.value)}
                    />
                  <button 
                    type="submit"
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
