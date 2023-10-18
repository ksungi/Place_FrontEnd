import React, { useEffect } from 'react';
import Space from'./Space.js';
import './App.css';
import { useState } from 'react';


function App() { 
  const [item, setItem] = useState([]);
  
  useEffect( ()=>{
    setItem({id: 0, title:"hi", done:true});
  }, []);
  

    return ( // 매개변수 item 에 변수명/값을 전달
    
      <div className="App">
        <Space item={item}/>
      </div>
    ); 
 }
 export default App;
 