import React, {useState} from 'react';

function Search(value){    
  const[value, setValue] = useState()

  const palavrachave = value.palavrachave

    return(
        <div className="w-2/12 relative">
          <input className="w-full p-2 rounded-full shadow-lg border-0 focus:outline-[#2968C8]" 
          placeholder="Buscar" id="search" onChange={e => setValue(e.target.value)}></input>
          <button className="absolute" style={{top: "50%", transform: "translateY(-50%)",left: "90%"}}>🔎</button>
        </div>
    )
}

export default Search;