import './App.css';
import React from 'react';
import { Home } from "./Components/Home/Home.jsx"
import { Create } from './Components/Create/Create.jsx';
import { Welcome } from './Components/Welcome/Welcome';
import { Detail } from './Components/Detail/Detail';
import { About } from './Components/About/About';
import { Search } from './Components/Search/Search.jsx';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
         <Route path="/" element={<Welcome/>}/>
         <Route path="/home" element={<Home/>}/>
         <Route path="/home/:id" element={<Detail/>}/>
         <Route path="/create" element={<Create/>}/>
         <Route path="/about" element={<About/>}/>
         <Route path="/search" element={<Search/>}/>
      </Routes>
    </div>
  );
}

export default App;
