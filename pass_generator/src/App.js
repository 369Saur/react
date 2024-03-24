import { useState, useCallback, useEffect, useRef } from "react";

function App() {

  const [length , setLength]  = useState(8) ;
  const [NumAllowed , setNumAllowed]  = useState(false) ;
  const [CharAllowed , setCharAllowed]  = useState(false) ;
  const [Password , setPassword] = useState("") ;

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "" ;
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" ;

    if(NumAllowed) str += "0123456789" ;
    if(CharAllowed) str += "!@#$&*^_" ;

    for(let i = 1 ; i <= length ; i++){
      let char = Math.floor(Math.random()*str.length+1) ;
      pass += str.charAt(char) ;
    }

    setPassword(pass)

  } , [length,NumAllowed,CharAllowed,setPassword])

  const CopyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(() => {
    passwordGenerator()
  },[length,NumAllowed,CharAllowed,passwordGenerator])

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
        <input 
          type="text"
          value={Password}
          className="outline-none w-full py-1 px-3" 
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button
        onClick={CopyPasswordToClipBoard}
         className="outline-none px-3 py-0.5 bg-blue-700 text-white shrink-0">copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
          type="range"
          min={6}
          max={100} 
          value={length}
          className="cursor-pointer"
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked = {NumAllowed}
          id="NumInput"
          onChange={() => {
            setNumAllowed((prev) => !prev)
          }}
          />
          <label htmlFor="NumInput">Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked = {CharAllowed}
          id="CharInput"
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }}
          />
          <label htmlFor="CharInput">Character</label>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
