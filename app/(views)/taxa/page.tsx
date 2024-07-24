'use client'

import LayoutApp from "@/components/shared/LayoutApp/page";
import Title from "@/components/shared/Title/page";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPercent } from "react-icons/fa";

interface TaxaProps{
    id: number,
    parcela: number,
    valor: number
}

export default function Taxa( props: TaxaProps ){
    const url = "http://localhost:8080/api/taxa"
    const [id, setId] = useState()
    const [parcela, setParcela] = useState("")
    const [selectParcela, setSelectParcela] = useState("")
    const [valor, setValor] = useState("")
    const [data, setData] = useState([])

    const [btnEditar, setBtnEditar] = useState("hidden")
    const [btnCadastrar, setBtnCadastrar] = useState("")

    // listados
    useEffect(() => {
        axios.get(url)
       .then(response => setData(response.data))
       .catch(error => console.error(error))
    }, [data, setData])

    // Cadastro
    const hadleCadastrar = () => {
        if(!parcela ||!valor){
            alert("Preencha todos os campos!")
            return false
        }else{
            alert("Parcela " + parcela + " x - " + "Fator: " + valor)

            axios.post(url, {
                parcela,
                valor
            })
            // handle success
            .then(function (response) {
            console.log(response);
            alert("Cadastro realizado com sucesso")
            setParcela("")
            setValor("")
        }).catch(function (error) {
            // handle error
            console.log("Error " + error);
            alert("Erro ao cadastrar " + error.message)
        })
        }
        
    }

    // Deletar
    const handleDelete = (id: any) =>{
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
    const handleEdit = (id: any, parcela: any, valor: any) => {
        setBtnCadastrar("hidden")
        setBtnEditar("")

        setId(id)
        setParcela(parcela)
        setValor(valor)
    }

    // Salvar alterações
    const handleSave = () => {
        axios.put(url, {
            id,
            parcela,
            valor
        })
        .then(function (response) {
            console.log(response);
            // handle error
            alert("Alterado com sucesso")
            setParcela("")
            setValor("")

            setBtnCadastrar("")
            setBtnEditar("hidden")
        })
        .catch( function (error) {
            // handle error
            console.log("Error " + error);
            alert("Erro ao deletar " + error.message)
        })
    }


    return(
        <LayoutApp>
            <Title icon={FaPercent} title="Taxa" subTitle="Cadastro de taxas mês"  />

            <section className="flex flex-col items-center justify-center">
                <form>
                    <input 
                        type="text" required
                        value={parcela} onChange={ e => setParcela(e.target.value)} 
                        placeholder=" 6 x"  className="p-3 m-2 text-center outline-0"
                    />
                    <input 
                        type="text" required
                        value={valor} onChange={ e =>   setValor(e.target.value)}  
                        placeholder=" 0.6 " className="p-3 m-2 text-center outline-0" 
                    />
                    <div className="grup-button flex items-center justify-center text-white">
                        <button 
                            onClick={hadleCadastrar} type="button" 
                            className={` ${btnCadastrar} w-28 p-3 m-2 bg-blue-600`}
                        >Inserir</button>
                        <button 
                            onClick={handleSave} type="button" 
                            className={`${btnEditar}  w-28 p-3 m-2 bg-blue-600`}
                        >Alterar</button>
                        <button 
                            type="reset" 
                            className="w-28 p-3 m-2 bg-red-600"
                        >Cancelar</button>
                    </div>
                </form>
            </section>

            <section>
                <select className="p-3 w-40 mb-20 mt-20">
                    {
                        data.map((item : TaxaProps ) => (
                            <option key={item.id} value={item.parcela}>{item.parcela} x</option>
                        ))
                    }
                </select>
            </section>

            <table className="w-full">
                <thead className="bg-green-500">
                    <tr className="h-16">
                        <th className="w-24"># ID</th>
                        <th>Parcela</th>
                        <th>Fator</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-blue-400">
                   { data.map((item : TaxaProps ) => (
                     <tr className="h-12" key={item.id}>
                        <td className="w-24 text-center">{item.id}</td>
                        <td className="w-auto text-center">{item.parcela} x </td>
                        <td className="w-auto text-center">{item.valor}</td>
                        <td className="grup-button">
                            <button
                                onClick={ () => handleEdit( item.id, item.parcela, item.valor )}
                                className="p-3 m-2 bg-yellow-600 text-white"
                            >Alterar</button>
                            <button 
                                onClick={ () => handleDelete(item.id)}
                                className="p-3 m-2 bg-red-600 text-white" 
                            >Excluir</button>
                        </td> 
                    </tr>
                   ))

                   }
                </tbody>
            </table>

        </LayoutApp>
    )
}

function FormTaxa(){
    return(
        <form>
            <select >
                <option value="6">  6 x </option>
                <option value="12"> 12 x </option>
                <option value="24"> 24 x </option>
                <option value="36"> 36 x </option>
                <option value="72"> 72 x </option>
            </select>
            <select >
                <option value="6">  0.6 </option>
                <option value="12"> 0.12 </option>
                <option value="24"> 0.24 </option>
                <option value="36"> 0.36 </option>
                <option value="72"> 0.72 </option>
            </select>
            <input type="text" placeholder="Valor" />
            <button type="submit">Salvar</button>
        </form>
    )
}