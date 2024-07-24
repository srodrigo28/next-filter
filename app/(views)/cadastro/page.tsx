'use client'

import LayoutApp from "@/components/shared/LayoutApp/page";
import { useRouter } from 'next/navigation'; // 1. import useRouter from 'next/navigation
import { useEffect, useState } from "react";
import axios from "axios";

interface ItemCategoriaProps{
    id: number,
    nome: string,
    descricao: string
}
 
export default function Cadastro( props : ItemCategoriaProps  ){
    // preparando o redirect
    const router = useRouter(); // 2. Instanciar o router

    const url = "http://localhost:8080/api/categoria"
    const [id, setId] = useState();
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [data, setData] = useState([])

    const [btnEditar, setBtnEditar] = useState("hidden")
    const [btnCadastrar, setBtnCadastrar] = useState("")

    // listar todos
    useEffect(() => {
        axios.get(url)
        .then(response => setData(response.data))
        .catch(error => console.error(error))
    }, [data, setData])

    // cancelar e limpar campos
    const cancelar = (e: any) => {
        e.preventDefault()

        setNome("")
        setDescricao("")
        setBtnCadastrar("")
        setBtnEditar("hidden")
    }

    // Cadastrar
    const handleSubmit = (e:any) => {
        e.preventDefault()
        
        if(!nome){
            alert("Please you need to add a categoria")
            return false
        }else if(!descricao){
            alert("Please you need to add a descricao")
            return false
        }

        // efetua o post inserir
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

        router.push('/pedido')  // 3. fazer o push urls
    }

    // Deletar
    const handleDelete = (id: any) => {
        if(!window.confirm("Deseja realmente deletar esse cadastro?")) { return false }

        axios.delete(url + "/" + id)
        .then(function (response) {
            console.log(response);
            // handle error
            alert("Deletado com sucesso")
        })
        .catch( function (error) {
            // handle error
            console.log("Error " + error);
            alert("Erro ao deletar " + error.message)
        })
    }

    // Carregar campos
    const handleEdit = ( id: any, nome: any, descricao: any ) => {
        // alert( "id: " + id + " nome: " + nome + " descricao: " + descricao )

        setBtnCadastrar("hidden")
        setBtnEditar("")
        
        setId(id)
        setNome(nome)
        setDescricao(descricao)
        
    }

    // Alterar
    const handEditSave = (e: any) => {
        e.preventDefault()

        // alert( id + " - " +  nome + " - " +  descricao)
        // alert( "" + url  )

        /** faz alteração    */ 
        axios.put(url, {
            id,
            nome,
            descricao
        })
        .then(function (response) {
            console.log(response);
            // handle error
            alert("Alterado com sucesso")
        })
        .catch( function (error) {
            // handle error
            console.log("Error " + error);
            alert("Erro ao deletar " + error.message)
        })
        
     
    }

    return(
        <LayoutApp>
            <div className="flex bg-blue-500 p-5 text-white text-3xl rounded-md mb-8">
                <h1>Cadastro de categoria</h1>
            </div>

            {/* Opcional 4. passo botão push */}
            <button className="p-3 bg-yellow-500" onClick={() => router.push('/pedido')}>Redirect</button>

            <section className="">
                <form autoComplete="off">
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
                            onClick={handleSubmit} className={` ${btnCadastrar} bg-blue-500 text-white p-3 transition 
                            ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 rounded-md`
                            }>Cadastrar</button>
                        <button 
                            onClick={handEditSave} className={` ${btnEditar} bg-blue-500 text-white p-3 rounded-md  transition  
                                ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300`
                            }>Alterar</button>
                        <button
                            onClick={cancelar} className="bg-red-400 text-white p-3 rounded-md  transition
                            ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 duration-300"
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
                        { data.map((item: ItemCategoriaProps) => (
                            <tr key={item.id} className="h-12 even:bg-amber-100 odd:bg-blue-100">
                                <td className="text-center w-16">{item.id}</td>
                                <td className="w-max">{item.nome}</td>
                                <td className="">{item.descricao}</td>
                                <td className="flex gap-2 items-center justify-center">
                                    <button
                                        onClick={ () => handleEdit(item.id, item.nome, item.descricao)  }
                                        className="bg-yellow-500 text-white p-2 rounded-md"
                                    >Edit</button>
                                    <button 
                                        onClick={ () => handleDelete(item.id) }  
                                        className="bg-red-500 text-white p-2 rounded-md" 
                                    >Del</button>
                                </td>
                            </tr>
                         ))}
                    </tbody>
                </table>
            </section>
            
        </LayoutApp>
    )
}