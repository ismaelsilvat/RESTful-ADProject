import React, { Component, useState } from "react";
import Anuncio from './components/anuncio';
import Lista from './components/lista';

function App(){

  const[show, setShow] = useState(false);
  const[buttonShow, setbuttonShow] = useState(true)

  return (
    <body style={{backgroundColor: "#f6f6f6",minHeight: "100vh"}}>
      <header className="flex place-content-between bg-[#2968C8] px-11 items-center h-80px w-full shadow-xl">
        <div className="w-2/12 relative">
          <input className="w-full p-2 rounded-full shadow-lg border-0 focus:outline-[#2968C8]" placeholder="Buscar"></input>
          <button className="absolute" style={{top: "50%", transform: "translateY(-50%)",left: "90%"}}>🔎</button>
        </div>
        <h1 className="font-serif text-2xl text-white font-bold subpixel-antialiased">NunciaKi!</h1>
        <div className="w-2/12 flex justify-center">
          {buttonShow ?(
            <button className="w-1/2 bg-[#F78323] p-2 rounded-full text-white font-bold" onClick={() => setShow(!show, setbuttonShow(!buttonShow))}>Criar anúncio</button>
          ):null}
          {show ?(
            <button className="w-1/2 bg-white p-2 rounded-full text-[#F78323] font-bold" onClick={() => setShow(!show, setbuttonShow(!buttonShow))}>Ver anúncios</button>
          ):null}
        </div>
      </header>
      {show ?(
        <Anuncio></Anuncio>
      ):null}
      {buttonShow ?(
        <Lista></Lista>
      ):null}
    </body>
  )
}

export default App;
