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
                <div className="flex p-2 w-full ml-auto items-center border-b-2 mb-5 sm:flex-col">
                    <div className="w-3/4 flex justify-end items-center sm:w-full">
                        <input className="w-3/4 p-3 rounded-full shadow-lg border-0 focus:outline-[#2968C8] text-center sm:w-full sm:text-left" 
                        placeholder="Buscar" id="search" onChange={e => setValue(e.target.value)}></input>
                    </div>
                    <div className="w-1/4 flex flex-col items-end sm:w-full sm:mt-2">
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
                            <div className="flex w-3/4 h-250px rounded-lg m-auto  my-5 shadow-lg bg-white border-2 border-[#d2d2d2] lg:w-11/12 md:flex-col md:w-3/4 sm:w-11/12 lg:h-auto" key={ListAnuncio.idanuncio}>
                                <div className="border-r-4 border-[#2E377B] rounded-lg w-2/5 md:w-full md:border-r-0 md:border-b-4 flex justify-center items-center">
                                    <img className="max-w-full max-h-full object-fill" src={`https://nunciaki.herokuapp.com/files/${ListAnuncio.src}`}></img>
                                </div>
                                <div className="w-full p-2 flex flex-col">
                                    <div className="w-full flex place-content-between sm:p-0" style={{"height": "25%"}}>
                                        <div className="flex w-full flex-wrap">
                                            <h1 className="font-bold text-lg w-full sm:w-full sm:text-base sm:mb-5">{ListAnuncio.titulo}</h1>
                                            <div className="flex w-full justify-end sm:justify-start">
                                                <h2 className="sm:text-sm">Categoria: 
                                                </h2>
                                                <h5 className="font-bold ml-1">{ListAnuncio.categoria}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="break-all p-3 sm:p-0 my-5" style={{"height": "50%"}}>
                                        <h2 className="sm:text-sm pt-0.5 h-1/4">Descrição</h2>
                                        <h5 className="font-bold sm:text-base">{ListAnuncio.descricao}</h5>
                                    </div>
                                    <div className="flex flex-wrap px-2 items-end sm:p-0" style={{"height": "25%"}}>
                                        <div className="flex w-1/2 sm:w-full">
                                            <h2  className="sm:text-base">Data inicial:</h2>
                                            <h5 className="font-bold ml-1 sm:text-base">{ListAnuncio.data_inicial}</h5>
                                        </div>
                                        <div className="flex w-1/2 sm:w-full justify-end sm:justify-start">
                                            <h2  className='sm:text-base'>Data final:</h2>
                                            <h5 className="font-bold ml-1 sm:text-base">{ListAnuncio.data_final}</h5>
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