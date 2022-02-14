import React, { Component, useState, useEffect } from "react";
import '../App.css';

function Lista(){

    const [ListAnuncios, setAnuncios] = useState([]);

    async function getAnuncios(){
        const response = await fetch('http://localhost:5000/anuncios')
        const data = await response.json()
        setAnuncios(data)
      };
      
      useEffect(() => {
        getAnuncios()
      }, []);

    return(
        <body>
            <div>
                <h1 className="text-center text-4xl font-bold m-10 mb-16">Anúncios ativos</h1>
            </div>
            <div className="flex flex-col w-3/4 mx-auto border-2 border-[#d2d2d2]">  
                <div className="flex flex-col p-2 w-full ml-auto justify-end items-end border-b-2 mb-5">
                    <label>Filtros</label>        
                    <select className="p-3 my-1 border-2 border-double border-[#2E377B] rounded">
                        <option selected>Todos</option>
                        <option value="Produto novo">Produto Novo</option>
                        <option value="Produto Usado">Produto Usado</option>
                        <option value="Serviço">Serviço</option>
                        <option value="Emprego">Emprego</option>
                    </select>
                </div>  
                {ListAnuncios.map(ListAnuncio =>{
                    return(
                        <div className="flex h-200px w-3/4 rounded-lg m-auto  my-5 shadow-lg bg-white border-2 border-[#d2d2d2]" key={ListAnuncio.idanuncio}>
                            <img className="w-1/4 border-r-4 border-[#2E377B] rounded-lg" src="https://www.wikihow.com/images/7/75/Make-a-Picture-Link-in-HTML-Step-8.jpg" ></img>
                            <div className="w-3/4">
                                <div className="w-full p-3 flex place-content-between">
                                    <h1>{ListAnuncio.titulo}</h1>
                                    <h2>{ListAnuncio.categoria}</h2>
                                </div>
                                <p style={{height: "50%"}}>{ListAnuncio.descricao}</p>
                                <div className="flex px-2 place-content-between items-end" style={{height: "25%"}}>
                                    <p>Data inicial: {ListAnuncio.data_inicial}</p>
                                    <p>Data final: {ListAnuncio.data_final}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </body>
    )
}

export default Lista;