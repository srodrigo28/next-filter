'use client'
import LayoutApp from "@/components/shared/LayoutApp/page";
import axios from "axios";
import { useEffect, useState } from "react";
 
export default function Cadastro(){
    const url = "http://localhost:8080/api/categoria"
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(url)
        .then(response => setData(response.data))
    }, [data, setData])

    const handleSubmit = (e:any) => {
        e.preventDefault()
        
        if(!nome){
            alert("Please you need to add a categoria")
            return false
        }else if(!descricao){
            alert("Please you need to add a descricao")
            return false
        }

        axios.post(url, {
            nome,
            descricao
        }).then(function (response) {
            // handle success
            console.log(response);
            alert("Cadastro realizado com sucesso")
            setNome("")
            setDescricao("")
        }).catch(function (error) {
            // handle error
            console.log("Error " + error);
            alert("Erro ao cadastrar " + error.message)
        })

    }

    return(
        <LayoutApp>
            <div className="flex bg-blue-500 p-5 text-white text-3xl rounded-md mb-8">
                <h1>Cadastro</h1>
            </div>

            <section className="">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="row flex gap-3 mb-3">
                        <input 
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            type="text" placeholder="Nome da categoria"
                            className=" p-3 w-full border-none bg-slate-100 outline-0"
                        />
                        <input 
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            type="text" placeholder="Descrição"
                            className=" p-3 w-full border-none bg-slate-100 outline-0"
                        />
                    </div>
                    <div className="group-button flex gap-3 mb-5">
                        <button 
                        className="bg-blue-500 text-white p-3 rounded-md  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                        >Cadastrar</button>
                        <button 
                        className="bg-red-400 text-white p-3 rounded-md  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 duration-300"
                        >Cancelar</button>
                    </div>
                </form>
            </section>

            <section className="flex justify-center w-full ">
                <table className="w-full">
                    <thead className="bg-green-500 h-16 rounded-md text-white">
                        <tr className="p-7">
                            <th className="text-center">#ID</th>
                            <th className="w-auto text-left">Categoria</th>
                            <th className="w-auto text-left max-w-screen-2xl">Descrição</th>
                            <th className="w-auto">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.map((item: any) => (
                            <tr key={item.id} className="h-12 even:bg-amber-100 odd:bg-blue-100">
                                <td className="text-center w-16">{item.id}</td>
                                <td className="w-max">{item.nome}</td>
                                <td className="">{item.descricao}</td>
                                <td className="flex gap-2 items-center justify-center">
                                    <button className="bg-yellow-500 text-white p-2 rounded-md">Edit</button>
                                    <button className="bg-red-500 text-white p-2 rounded-md">Del</button>
                                </td>
                            </tr>
                         ))}
                    </tbody>
                </table>
            </section>
            
        </LayoutApp>
    )
}