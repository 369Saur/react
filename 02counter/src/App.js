import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  let[counter,setCounter] = useState(5)
  const addValue = () =>{
    counter = counter + 1 ;
    setCounter(counter) ;
  }
  const removeValue = () =>{
    counter = counter - 1 ;
    setCounter(counter) ;
  }
  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter value : {counter}</h2>
      <button onClick={addValue}>Add value {counter}</button>
      <br/>
      <button onClick={removeValue}>Remove value {counter}</button>
    </>
  );
}

export default App;
