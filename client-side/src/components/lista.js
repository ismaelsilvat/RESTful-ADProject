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
        getAnuncios();
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
                <h1 className="m-10 mb-16 text-4xl text-center font-bold sm:m-6 sm:text-3xl">Anúncios ativos</h1>
            </div>
            <div className="w-3/4 mx-auto flex flex-col border-2 border-[#d2d2d2] lg:w-11/12">  
                <div className="w-full p-2 ml-auto mb-5 flex items-center border-b-2 sm:flex-col">
                    <div className="w-3/4 flex justify-end items-center sm:w-full">
                        <input className="w-3/4 p-3 text-center rounded-full shadow-lg border-0 focus:outline-[#2968C8] sm:w-full sm:text-left" 
                        placeholder="Buscar" id="search" onChange={e => setValue(e.target.value)}></input>
                    </div>
                    <div className="w-1/4 flex flex-col items-end sm:w-full sm:mt-2">
                        <label>Filtros</label>        
                        <select className="w-1/2 p-1 my-1 border-2 border-double border-[#2E377B] rounded" defaultValue={'Todos'} onChange={e => setFiltro(e.target.value)}>
                            <option value="Todos">Todos</option>
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
                            <div className="w-3/4 h-250px m-auto my-5 flex rounded-lg shadow-lg border-2 border-[#d2d2d2] bg-white lg:w-11/12 lg:h-auto md:w-3/4 md:flex-col sm:w-11/12" key={ListAnuncio.idanuncio}>
                                <div className="w-2/5 flex justify-center items-center border-r-4 border-[#2E377B] rounded-lg  md:w-full md:border-r-0 md:border-b-4 ">
                                    <img className="max-w-full max-h-full object-fill" src={`https://nunciaki.herokuapp.com/files/${ListAnuncio.src}`}></img>
                                </div>
                                <div className="w-full p-2 flex flex-col">
                                    <div className="w-full mb-3 flex place-content-between sm:p-0" style={{"height": "25%"}}>
                                        <div className="w-full flex flex-wrap">
                                            <h1 className="w-full mb-3 text-lg font-bold sm:w-full sm:text-base">{ListAnuncio.titulo}</h1>
                                            <div className="w-full flex">
                                                <h2 className="sm:text-sm">Categoria:</h2>
                                                <h5 className="ml-1 font-bold">{ListAnuncio.categoria}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="my-5 break-all" style={{"height": "50%"}}>
                                        <h2 className="h-1/4 pt-0.5 sm:text-sm ">Descrição</h2>
                                        <h5 className="font-bold sm:text-base">{ListAnuncio.descricao}</h5>
                                    </div>
                                    <div className="px-2 flex flex-wrap items-end sm:p-0" style={{"height": "25%"}}>
                                        <div className="w-1/2 flex sm:w-full">
                                            <h2 className="sm:text-base">Data inicial:</h2>
                                            <h5 className="ml-1 font-bold sm:text-base">{ListAnuncio.data_inicial}</h5>
                                        </div>
                                        <div className="w-1/2 flex justify-end sm:w-full sm:justify-start">
                                            <h2 className='sm:text-base'>Data final:</h2>
                                            <h5 className="ml-1 font-bold sm:text-base">{ListAnuncio.data_final}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    };
                    if(Filtro === "Todos"){ 
                        if(value != null){
                            if((ListAnuncio.titulo).includes(value)){return(Structure())}
                            else{
                                contadorSearch++;
                                if(contadorSearch === elements){return(<h1 className="text-center text-[#adadad] font-bold">Não há anúncios ativos com esse filtro no momento.</h1>)};
                            }
                        }
                        else{return(Structure());}
                    }
                    else{
                        if(Filtro === ListAnuncio.categoria){
                            numero++;
                            if(numero === ListAnuncios.length){
                                if(value != null){
                                    if((ListAnuncio.titulo).includes(value)){return(Structure());}
                                    else{return(<h1 className="text-center text-[#adadad] font-bold">Não há anúncios ativos com esse filtro no momento.</h1>);}
                                }
                                else{return(Structure());}
                            }
                            else{
                                if(value != null){
                                    if((ListAnuncio.titulo).includes(value)){return(Structure());}
                                    else{
                                        if(contadorSearch === 0){
                                            if(contadorSearch === numero){return(<h1 className="text-center text-[#adadad] font-bold">Não há anúncios ativos com esse filtro no momento.</h1>);}
                                            else{contadorSearch++;}
                                        }else{
                                            contadorSearch++;
                                            if(contadorSearch === numero){return(<h1 className="text-center text-[#adadad] font-bold">Não há anúncios ativos com esse filtro no momento.</h1>);}
                                        }
                                    }
                                }
                                else{return(Structure());}
                            }
                        }
                        else{
                            contador++;
                            if(contador === ListAnuncios.length){return(<h1 className="text-center text-[#adadad] font-bold">Não há anúncios ativos com esse filtro no momento.</h1>);}
                        }
                    }
                })}
            </div>
        </div>
    );
};

export default Lista;