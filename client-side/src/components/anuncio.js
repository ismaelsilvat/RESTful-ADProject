import React, { Component, useState } from "react";
import '../App.css';

function Anuncio(){
    
    class Anuncio extends Component {
        constructor(props){
          super(props);
      
          this.state = ({
            titulo: null,
            descricao: null,
            dataInicial: null,
            dataFinal: null,
            Categoria: null,
            Email: null,
            Telefone: null
          });
        };     
    };
    
    const newAnuncio = new Anuncio();
    const[file, setFile] = useState();
    const[maxID, setMaxId] = useState();
    let preview = document.getElementById('img');
    
    if(file != null){
        const reader = new FileReader();
        const fileInfo = file;
        reader.onload = function(){
            preview.src = reader.result;
        };
        reader.readAsDataURL(fileInfo);
        preview.style = "display: block; width: 175px; object-fit: fill";
    }
    
    async function imagem(maxId){
        try {
            const data = new FormData();
            data.append('img', file);
            data.append('maxId', maxId[0].idanuncio);
            await fetch("https://nunciaki.herokuapp.com/file",{
                method: "POST",  
                body: data
            });
        } catch (error) {
            console.log(error.message);
        }
    };
    
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
            });
            let maxId = await id.json();
            imagem(maxId);
        } catch (error) {
        console.log(error.message);
        }
    };

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    return(
        <div>
            <div>
                <h1 className="m-10 mb-16 text-4xl text-center font-bold sm:mb-8 sm:text-3xl">Criar Anúncio</h1>
            </div>
            <div className="w-11/12 px-7 p-5 m-auto flex justify-center border-2 rounded-lg border-[#d2d2d2] bg-white shadow-md shadow-[#2968C8] e-lg:w-3/4 lg:px-5 lg:flex-col">  
                <div className="w-1/2 pb-24 flex flex-col space-x lg:w-full lg:pb-0 lg:flex-wrap lg:flex-row lg:place-content-around">
                    <div className="mb-2 lg:w-3/4 sm:w-full">
                        <label className="font-bold">Título</label>
                        <input type="text" className="w-3/4 p-4 my-1 block text-sm text-slate-500 border-2 border-double border-[#2E377B] rounded lg:w-full" 
                        placeholder="ex: Vende-se celular usado" onChange={e =>{
                        if(isNumber(e.target.value) === true ){document.getElementById('1').innerHTML = "Preencha os inputs com letras e números."}
                        else{document.getElementById('1').innerHTML = ""}
                        }} id="i1"></input>
                        <li className="text-[red] list-none" id="1"></li>
                    </div>
                    <div className="mb-2 lg:w-2/5 sm:w-full">
                        <label className="font-bold">Categoria</label>
                        <select className="w-2/4 p-4 my-1 block border-2 border-double border-[#2E377B] rounded lg:w-full" defaultValue={'Default'} placeholder="Categorias" id="i2">
                            <option value="Default" disabled>Escolher categoria</option>
                            <option value="Produto novo">Produto Novo</option>
                            <option value="Produto Usado">Produto Usado</option>
                            <option value="Serviço">Serviço</option>
                            <option value="Emprego">Emprego</option>
                        </select>
                    </div>
                    <div className="mb-2 lg:w-2/5 sm:w-full">
                        <label className="font-bold">Telefone</label>
                        <input type="tel" placeholder="ex: 55048991891499" className="w-2/4 p-4 my-1 block border-2 border-double border-[#2E377B] rounded lg:w-full"
                        onChange={e => {
                            if(isNumber(e.target.value) === false ){document.getElementById('2').innerHTML = "Preencha apenas com números."}
                            else{
                                if((e.target.value).length === 12){document.getElementById('2').innerHTML = ""}
                                else{document.getElementById('2').innerHTML = "Preencha obrigatoriamente com seu DDD e seu número. Exemplo: 048991915504"}
                            }
                        }} id="i3"></input>
                        <li className="text-[red] list-none" id="2"></li>
                    </div>
                    <div className="mb-2 lg:w-3/4 sm:w-full">
                        <label className="font-bold">Email para contato</label>
                        <input type="email" className="w-3/4 p-4 my-1 block border-2 border-double border-[#2E377B] rounded lg:w-full"
                        id="i4"></input>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col place-content-between lg:w-full lg:flex-wrap lg:flex-row lg:place-content-around">
                    <div className="mb-2 lg:w-2/5 sm:w-full">
                        <label className="font-bold">Data inicial</label>
                        <input type="date" className="w-2/4 block p-3 my-1 border-2 border-double border-[#2E377B] rounded lg:w-full"
                        id="i5"></input>
                    </div>
                    <div className="mb-2 lg:w-2/5 sm:w-full">
                        <label className="font-bold">Data final</label>
                        <input type="date" className="w-2/4 p-3 my-1 block border-2 border-double border-[#2E377B] rounded lg:w-full "
                        id="i6"></input>
                    </div>
                    <div className="mb-2 w-full">     
                        <label className="font-bold">Descrição</label>
                        <textarea type="text" className="w-full h-150px p-3 my-1 block border-2 border-double border-[#2E377B] rounded lg:w-full"
                        style={{resize: "none"}} id="i7"></textarea>
                    </div>
                    <div className="min-h-212px flex lg:w-3/4 lg:flex-col sm:w-full">
                        <div className="w-3/4 lg:w-full">
                            <label className="font-bold">Imagem</label>
                            <input type="file" className="w-full my-1 block rounded" placeholder="Escolher imagem" onChange={e => {setFile(e.target.files[0])}}></input>
                            <img id="img" style={{display: "none"}} src={preview} alt='img'></img>
                        </div>
                        <div className="w-full h-full p-4 flex justify-center">
                            <button type="button" className="w-full p-3 mt-auto text-white font-bold rounded-lg bg-[#2968C8] lg:w-3/4" onClick={armazenar}>Anunciar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Anuncio;