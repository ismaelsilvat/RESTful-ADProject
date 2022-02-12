import React, { Component, useState } from "react";
import './App.css';


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

let img;
let newAnuncio = new Anuncio(); 

async function imagem(){
  try {
    const data = new FormData();
    data.append('img', img)
    
    console.log('Oi',data);
  
    let res = await fetch("http://localhost:5000/file",{
      method: "POST",
      body: data,
      headers: { "Content-Type":"multipart/form-data;" },
    }
    )
    let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert('Upload Successful');
      }
      else{
        alert('erro')
      }
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
    }
    )
    imagem()
  } catch (error) {
    console.log(error.message);
  }
};

function App(){
  return (
    <div className="container">
      <h1>Anúncios</h1>
      <div className="content">
        <div className="row-inputs">
          <div className="col-inputs">
            <label>Título</label>
            <input type="text" className="input" 
            onChange={e => newAnuncio.state.titulo = e.target.value}></input>
          </div>
          <div className="col-inputs">
            <label>Telefone</label>
            <input type="num" className="input"
            onChange={e => newAnuncio.state.Telefone = e.target.value}></input>
          </div>
        </div>
        <div className="row-inputs">
          <div className="col-inputs">
            <label>Data inicial</label>
            <input type="date" className="input"
            onChange={e => newAnuncio.state.dataInicial = e.target.value}></input>
          </div>
          <div className="col-inputs">
            <label>Data final</label>
            <input type="date" className="input"
            onChange={e => newAnuncio.state.dataFinal = e.target.value}></input>
          </div>
        </div>
        <div className="row-inputs">
          <div className="col-inputs">
            <label>Categoria</label>
            <select className="input select" placeholder="Categorias" id="categoria" 
             onChange={e => newAnuncio.state.Categoria = e.target.value}>
              <option selected>Escolher categoria</option>
              <option value="Produto novo">Produto Novo</option>
              <option value="Produto Usado">Produto Usado</option>
              <option value="Serviço">Serviço</option>
              <option value="Emprego">Emprego</option>
            </select>
          </div>
          <div className="col-inputs">
            <label>Email para contato</label>
            <input type="email" className="input"
            onChange={e => newAnuncio.state.Email = e.target.value}></input>
          </div>
        </div>
        <div className="row-inputs">
          <div className="col-inputs col-desc">
            <label>Descrição</label>
            <input type="text" className="input descricao"
            onChange={e => newAnuncio.state.descricao = e.target.value}></input>
            <label>Imagem</label>
            <input type="file" className="Escolher imagem"
            onChange={e => (img = e.target.value)}></input>
          </div>
        </div>
        <button type="button" className="button" onClick={armazenar}>Criar Anúncio</button>
      </div>
    </div>
  )
}

export default App;
