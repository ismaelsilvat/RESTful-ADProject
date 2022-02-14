import React, { Component, useState } from "react";
import '../App.css';

function Anuncio(){
    
    class Anuncio extends Component {
        constructor(props){
          super(props)
      
          this.state = ({
            titulo: null,
            descricao: null,
            dataInicial: null,
            dataFinal: null,
            Categoria: null,
            Email: null,
            Telefone: null
          })
        };     
      };
    
    const newAnuncio = new Anuncio();
    const[file, setFile] = useState();
    const preview = document.getElementById('iimg');
  
    if(file){
        const reader = new FileReader();
        reader.onload = function(){
        preview.src = reader.result
        }
        reader.readAsDataURL(file)
        preview.style = "display: block; width: 175px; height: 148px; object-fit: fill"
    }

    async function imagem(){
        try {
        const data = new FormData();
        data.append('img', file)
        console.log('Data: ',data);
        console.log('Com useState: ', file);
        
        await fetch("http://localhost:5000/file",{
            method: "POST",  
            body: data
        })
        } catch (error) {
        console.log(error.message);
        }
    }

    async function armazenar(){
        try {
        const body = newAnuncio.state;
        await fetch("http://localhost:5000/anuncio",{
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(body)
        })
        imagem()
        } catch (error) {
        console.log(error.message);
        }
    };

    return(
        <body>
            <div>
                <h1 className="text-center text-4xl font-bold m-10 mb-16">Criar Anúncio</h1>
            </div>
            <div className="w-11/12 m-auto p-5 bg-white shadow-md shadow-[#2968C8] px-7 flex justify-center border-2 rounded-lg border-[#d2d2d2]">  
                <div className="w-1/2 flex flex-col place-content-between space-x pb-28">
                    <div>
                        <label className="font-bold">Título</label>
                        <input type="text" className="w-3/4 block p-3 my-1 border-2 border-double border-[#2E377B] rounded text-sm text-slate-500" 
                        placeholder="ex: Vende-se celular usado" onChange={e => newAnuncio.state.titulo = e.target.value}></input>
                    </div>
                    <div>
                        <label className="font-bold">Categoria</label>
                        <select className="w-2/4 block p-3 my-1 border-2 border-double border-[#2E377B] rounded" placeholder="Categorias" id="categoria" 
                        onChange={e => newAnuncio.state.Categoria = e.target.value}>
                            <option selected>Escolher categoria</option>
                            <option value="Produto novo">Produto Novo</option>
                            <option value="Produto Usado">Produto Usado</option>
                            <option value="Serviço">Serviço</option>
                            <option value="Emprego">Emprego</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-bold">Telefone</label>
                        <input type="tel" placeholder="ex: (55)048991891499" className="w-2/4 block p-3 my-1 border-2 border-double border-[#2E377B] rounded"
                        onChange={e => newAnuncio.state.Telefone = e.target.value}></input>
                    </div>
                    <div>
                        <label className="font-bold">Email para contato</label>
                        <input type="email" className="w-3/4 block p-3 my-1 border-2 border-double border-[#2E377B] rounded"
                        placeholder="ex: joao@gmail.com" onChange={e => newAnuncio.state.Email = e.target.value}></input>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col place-content-between">
                <div>
                    <label className="font-bold">Data inicial</label>
                    <input type="date" className="w-2/4 block p-3 my-1 border-2 border-double border-[#2E377B] rounded"
                    onChange={e => newAnuncio.state.dataInicial = e.target.value}></input>
                </div>
                <div>
                    <label className="font-bold">Data final</label>
                    <input type="date" className="w-2/4 block p-3 my-1 border-2 border-double border-[#2E377B] rounded"
                    onChange={e => newAnuncio.state.dataFinal = e.target.value}></input>
                </div>
                <div>     
                    <label className="font-bold">Descrição</label>
                    <textarea type="text" className="w-3/4 block w-full h-150px p-3 my-1 border-2 border-double border-[#2E377B] rounded"
                    onChange={e => newAnuncio.state.descricao = e.target.value} style={{resize: "none"}}></textarea>
                </div>
                <div className="flex min-h-212px">
                    <div className="w-3/4">
                    <label className="font-bold">Imagem</label>
                    <input type="file" className="w-full block my-1 rounded" placeholder="Escolher imagem"
                    onChange={e => setFile(e.target.files[0])}></input>
                    <img id="iimg" style={{display: "none"}} src={preview} alt='img'></img>
                    </div>
                    <div className="w-1/4 h-full p-4 flex">
                    <button type="button" className="w-full mt-auto p-3 rounded-lg font-bold bg-[#2968C8] text-white" onClick={armazenar}>Anunciar</button>
                    </div>
                </div>
                </div>
            </div>
        </body>
    )
}

export default Anuncio;