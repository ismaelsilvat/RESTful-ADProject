import React, { useState } from "react";
import Anuncio from './components/anuncio';
import Lista from './components/lista';

function App(){

  const[show, setShow] = useState(false);
  const[buttonShow, setbuttonShow] = useState(true);

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <header className="w-full h-80px px-11 flex place-content-between items-center bg-[#2968C8] shadow-xl sm:px-5">
        <h1 className="w-2/5 text-2xl text-center text-white font-serif font-bold subpixel-antialiased">NunciaKi!</h1>
        <div className="w-2/5 flex justify-center">
          {buttonShow ?(<button className="p-2 text-white font-bold bg-[#F78323] rounded-full" onClick={() => setShow(!show, setbuttonShow(!buttonShow))}>Criar anúncio</button>):null}
          {show ?(<button className="p-2 text-[#F78323] font-bold bg-white rounded-full" onClick={() => setShow(!show, setbuttonShow(!buttonShow))}>Ver anúncios</button>):null}
        </div>
      </header>
      {show ?(<Anuncio></Anuncio>):null}
      {buttonShow ?(<Lista></Lista>):null}
    </div>
  );
};

export default App;
