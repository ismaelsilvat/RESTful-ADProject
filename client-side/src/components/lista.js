import React, { useState, useEffect } from "react";
import '../App.css';

function Lista(){

    const[ListAnuncios, setAnuncios] = useState([]);
    const[Filtro, setFiltro] = useState("Todos");
    const[value, setValue] = useState();

    async function getAnuncios(){
        const response = await fetch("https://nunciaki.herokuapp.com/anuncios");
        const data = await response.json();
        setAnuncios(data);
    };
    
    useEffect(() => {
        getAnuncios()
    }, []);

    ListAnuncios.map(ListAnuncio =>{
        var string = ListAnuncio.data_inicial;
        var string2 = ListAnuncio.data_final;
        ListAnuncio.data_inicial = string.substring(0,10);
        ListAnuncio.data_final = string2.substring(0,10);
        return(
            console.log('Transformado!')
        )
    });

    let contador = 0;
    let contadorSearch = 0;
    let elements = ListAnuncios.length;
    let numero = 0;

    return(
        <div>
            <div>
                <h1 className="text-center text-4xl font-bold m-10 mb-16 sm:m-6 sm:text-3xl">Anúncios ativos</h1>
            </div>
            <div className="flex flex-col w-3/4 mx-auto border-2 border-[#d2d2d2] lg:w-11/12">  
                <div className="flex p-2 w-full ml-auto items-center border-b-2 mb-5">
                    <div className="w-3/4 flex justify-end items-center">
                        <input className="w-3/4 p-3 rounded-full shadow-lg border-0 focus:outline-[#2968C8] text-center" 
                        placeholder="Buscar" id="search" onChange={e => setValue(e.target.value)}></input>
                    </div>
                    <div className="w-1/4 flex flex-col items-end">
                        <label>Filtros</label>        
                        <select className="w-1/2 p-1 my-1 border-2 border-double border-[#2E377B] rounded" onChange={e => setFiltro(e.target.value)}>
                            <option selected value="Todos">Todos</option>
                            <option value="Produto novo">Produto Novo</option>
                            <option value="Produto Usado">Produto Usado</option>
                            <option value="Serviço">Serviço</option>
                            <option value="Emprego">Emprego</option>
                        </select>
                    </div>
                </div>  
                {ListAnuncios.map((ListAnuncio, i) =>{   
                    function Structure(){
                        return(
                            <div className="flex h-220px w-3/4 rounded-lg m-auto  my-5 shadow-lg bg-white border-2 border-[#d2d2d2] lg:w-11/12" key={ListAnuncio.idanuncio}>
                                <img className="border-r-4 border-[#2E377B] rounded-lg" 
                                src={`https://nunciaki.herokuapp.com/files/${ListAnuncio.src}`}
                                style={{width: "27%"}}></img>
                                <div style={{width: "73%", padding: 5}}>
                                    <div className="w-full p-3 flex place-content-between">
                                        <h1 className="font-bold text-lg">{ListAnuncio.titulo}</h1>
                                        <div className="flex">
                                            <h2  className='font-bold'>Categoria: </h2>
                                            <h5 className="ml-1">
                                                {ListAnuncio.categoria}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="break-all p-3" style={{height: "50%"}}>
                                        {ListAnuncio.descricao}
                                    </div>
                                    <div className="flex px-2 place-content-between items-end" style={{height: "25%"}}>
                                        <div className="flex">
                                            <h2  className='font-bold'>Data inicial:</h2>
                                            <h5>{ListAnuncio.data_inicial}</h5>
                                        </div>
                                        <div className="flex">
                                            <h2  className='font-bold'>Data final:</h2>
                                            <h5>{ListAnuncio.data_final}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    if(Filtro === "Todos"){ 
                        if(value != null){
                            if((ListAnuncio.titulo).includes(value)){return(Structure())}
                            else{
                                elements--
                                if(contadorSearch === elements){return(<h1 className="text-center font-bold text-[#adadad]">Não há anúncios ativos com esse filtro no momento.</h1>)}
                                else{contadorSearch++}
                            }
                        }
                        else{return(Structure())
                        }
                    }
                    else{
                        if(Filtro === ListAnuncio.categoria){
                            numero++
                            if(numero === 1){
                                if(value != null){
                                    if((ListAnuncio.titulo).includes(value)){return(Structure())}
                                    else{return(<h1 className="text-center font-bold text-[#adadad]">Não há anúncios ativos com esse filtro no momento.</h1>)}
                                }
                                else{return(Structure())}
                            }
                            else{
                                if(value != null){
                                    if((ListAnuncio.titulo).includes(value)){return(Structure())}
                                    else{
                                        elements--
                                        if(contadorSearch === elements){return(<h1 className="text-center font-bold text-[#adadad]">Não há anúncios ativos com esse filtro no momento.</h1>)}
                                        else{contadorSearch++}
                                    }
                                }
                                else{return(Structure())}
                            }
                        }
                        else{
                            contador++
                            if(contador === ListAnuncios.length){return(<h1 className="text-center font-bold text-[#adadad]">Não há anúncios ativos com esse filtro no momento.</h1>)}
                        }
                    }
                })}
            </div>
        </div>
    )
}

export default Lista;