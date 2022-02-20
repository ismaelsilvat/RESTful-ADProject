import React, { useState } from "react";
import Anuncio from './components/anuncio';
import Lista from './components/lista';

function App(){

  const[show, setShow] = useState(false);
  const[buttonShow, setbuttonShow] = useState(true)

  return (
    <body style={{backgroundColor: "#f6f6f6",minHeight: "100vh"}}>
      <header className="flex place-content-between bg-[#2968C8] px-11 items-center h-80px w-full shadow-xl sm:px-5">
        <h1 className="w-2/5 font-serif text-2xl text-center text-white font-bold subpixel-antialiased">NunciaKi!</h1>
        <div className="w-2/5 flex justify-center">
          {buttonShow ?(
            <button className="bg-[#F78323] p-2 rounded-full text-white font-bold" onClick={() => setShow(!show, setbuttonShow(!buttonShow))}>Criar anúncio</button>
          ):null}
          {show ?(
            <button className="bg-white p-2 rounded-full text-[#F78323] font-bold" onClick={() => setShow(!show, setbuttonShow(!buttonShow))}>Ver anúncios</button>
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
