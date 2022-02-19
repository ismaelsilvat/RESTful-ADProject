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
    const[maxID, setMaxId] = useState();
    var preview = document.getElementById('iimg');
    
    if(file != null){
        const reader = new FileReader();
        const fileInfo = file;
        reader.onload = function(){
            preview.src = reader.result
        }
        reader.readAsDataURL(fileInfo)
        preview.style = "display: block; width: 175px; object-fit: fill"
    }
    
    async function imagem(maxId){
        try {
            const data = new FormData();
            data.append('img', file);
            data.append('maxId', maxId[0].idanuncio)
            console.log(maxId[0].idanuncio);
            
            await fetch("https://nunciaki.herokuapp.com/file",{
                method: "POST",  
                body: data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    
    async function armazenar(){
        try {
            newAnuncio.state.titulo = document.getElementById('i1').value;
            newAnuncio.state.Categoria = document.getElementById('i2').value;
            newAnuncio.state.Telefone = document.getElementById('i3').value;
            newAnuncio.state.Email = document.getElementById('i4').value;
            newAnuncio.state.dataInicial = document.getElementById('i5').value;
            newAnuncio.state.dataFinal = document.getElementById('i6').value;
            newAnuncio.state.descricao = document.getElementById('i7').value;
            const body = newAnuncio.state;
            let id = await fetch("https://nunciaki.herokuapp.com/anuncio",{
                method: "POST",
                headers: { "Content-Type":"application/json"},
                body: JSON.stringify(body)
            })

            let maxId = await id.json()
            imagem(maxId)
            
        } catch (error) {
        console.log(error.message);
        }
    };

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    return(
        <div>
            <div>
                <h1 className="text-center text-4xl font-bold m-10 mb-16">Criar Anúncio</h1>
            </div>
            <div className="w-11/12 m-auto p-5 bg-white shadow-md shadow-[#2968C8] px-7 flex justify-center border-2 rounded-lg border-[#d2d2d2]">  
                <div className="w-1/2 flex flex-col place-content-between space-x pb-24">
                    <div>
                        <label className="font-bold">Título</label>
                        <input type="text" className="w-3/4 block p-3 my-1 border-2 border-double border-[#2E377B] rounded text-sm text-slate-500" 
                        placeholder="ex: Vende-se celular usado" onChange={e =>{
                            if(isNumber(e.target.value) === true ){
                                document.getElementById('1').innerHTML = "Preencha os inputs com letras e números."
                            }
                            else{
                                document.getElementById('1').innerHTML = ""
                            }
                        }} id="i1"> 
                        </input>
                        <li className="text-[red] list-none" id="1"></li>
                    </div>
                    <div>
                        <label className="font-bold">Categoria</label>
                        <select className="w-2/4 block p-3 my-1 border-2 border-double border-[#2E377B] rounded" placeholder="Categorias" id="i2">
                            <option selected>Escolher categoria</option>
                            <option value="Produto novo">Produto Novo</option>
                            <option value="Produto Usado">Produto Usado</option>
                            <option value="Serviço">Serviço</option>
                            <option value="Emprego">Emprego</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-bold">Telefone</label>
                        <input type="tel" placeholder="ex: 55048991891499" className="w-2/4 block p-3 my-1 border-2 border-double border-[#2E377B] rounded"
                        onChange={e => {
                            if(isNumber(e.target.value) === false ){
                                document.getElementById('2').innerHTML = "Preencha apenas com números."
                            }
                            else{
                                newAnuncio.state.Telefone = e.target.value
                                document.getElementById('2').innerHTML = ""
                            }
                        }} id="i3"> 
                        </input>
                        <li className="text-[red] list-none" id="2"></li>
                    </div>
                    <div>
                        <label className="font-bold">Email para contato</label>
                        <input type="email" className="w-3/4 block p-3 my-1 border-2 border-double border-[#2E377B] rounded"
                        id="i4"></input>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col place-content-between">
                <div>
                    <label className="font-bold">Data inicial</label>
                    <input type="date" className="w-2/4 block p-3 my-1 border-2 border-double border-[#2E377B] rounded"
                    id="i5"></input>
                </div>
                <div>
                    <label className="font-bold">Data final</label>
                    <input type="date" className="w-2/4 block p-3 my-1 border-2 border-double border-[#2E377B] rounded"
                    id="i6"></input>
                </div>
                <div>     
                    <label className="font-bold">Descrição</label>
                    <textarea type="text" className="w-3/4 block w-full h-150px p-3 my-1 border-2 border-double border-[#2E377B] rounded"
                    style={{resize: "none"}} id="i7"></textarea>
                </div>
                <div className="flex min-h-212px">
                    <div className="w-3/4">
                    <label className="font-bold">Imagem</label>
                    <input type="file" className="w-full block my-1 rounded" placeholder="Escolher imagem" onChange={e => {
                        setFile(e.target.files[0])
                    }}></input>
                    <img id="iimg" style={{display: "none"}} src={preview} alt='img'></img>
                    </div>
                    <div className="w-1/4 h-full p-4 flex">
                    <button type="button" className="w-full mt-auto p-3 rounded-lg font-bold bg-[#2968C8] text-white" onClick={armazenar}>Anunciar</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Anuncio;