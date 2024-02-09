import { useState } from 'react'
import './App.css'
import Register from './assets/components/Register'
import Login from './assets/components/Login'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'; 
import Dashboard from './assets/components/Dashboard';
function App() {


  return (
    <div className='App'>
         <Router>
          <Routes>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/" element={<Login />} />
            <Route path='/dashboard/:email' element={<Dashboard />} />
          </Routes>
         </Router>
    </div>
  )
}

export default App
