import React, { useState, useEffect } from "react";
import '../App.css';
// import img from "../files/1645033330096-310228.png"

function Lista(){

    const [ListAnuncios, setAnuncios] = useState([]);

    async function getAnuncios(){
        const response = await fetch('http://localhost:5000/anuncios')
        const data = await response.json()
        setAnuncios(data)
      };
    
    useEffect(() => {
        getAnuncios()
    }, [])

    ListAnuncios.map(ListAnuncio =>{
        var string = ListAnuncio.data_inicial;
        var string2 = ListAnuncio.data_final;

        ListAnuncio.data_inicial = string.substring(0,10)
        ListAnuncio.data_final = string2.substring(0,10)
        return(
            console.log('Transformado!')
        )
    })   

    
    return(
        <div>
            <div>
                <h1 className="text-center text-4xl font-bold m-10 mb-16">Anúncios ativos</h1>
            </div>
            <div className="flex flex-col w-3/4 mx-auto border-2 border-[#d2d2d2]">  
                <div className="flex flex-col p-2 w-full ml-auto justify-end items-end border-b-2 mb-5">
                    <label>Filtros</label>        
                    <select className="p-1 my-1 border-2 border-double border-[#2E377B] rounded" id="filtro">
                        <option selected>Todos</option>
                        <option value="Produto novo">Produto Novo</option>
                        <option value="Produto Usado">Produto Usado</option>
                        <option value="Serviço">Serviço</option>
                        <option value="Emprego">Emprego</option>
                    </select>
                </div>  
                {ListAnuncios.map((ListAnuncio, i) =>{   
                    return(
                        <div className="flex h-220px w-3/4 rounded-lg m-auto  my-5 shadow-lg bg-white border-2 border-[#d2d2d2]" key={ListAnuncio.idanuncio}>
                            <img className="border-r-4 border-[#2E377B] rounded-lg" 
                            src={require(`../files/${ListAnuncio.src}`)}
                            style={{width: "27%"}}></img>
                            <div style={{width: "73%", padding: 5}}>
                                <div className="w-full p-3 flex place-content-between">
                                    <h1 className="font-bold text-lg">{ListAnuncio.titulo}</h1>
                                    <div className="flex">
                                        <h2  className='font-bold'>
                                            Categoria: 
                                       </h2>
                                       <h5>
                                            {ListAnuncio.categoria}
                                       </h5>
                                    </div>
                                </div>
                                <div className="break-all p-3" style={{height: "50%"}}>
                                    {ListAnuncio.descricao}
                                </div>
                                <div className="flex px-2 place-content-between items-end" style={{height: "25%"}}>
                                    <div className="flex">
                                        <h2  className='font-bold'>
                                            Data inicial:  
                                       </h2>
                                       <h5>
                                            {ListAnuncio.data_inicial}
                                       </h5>
                                    </div>
                                    <div className="flex">
                                        <h2  className='font-bold'>
                                            Data final:      
                                       </h2>
                                       <h5> 
                                           {ListAnuncio.data_final}
                                       </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Lista;