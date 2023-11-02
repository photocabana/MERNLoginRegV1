import { useState } from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import HomePage from './components/HomePage'
import Login from './components/Login'


function App() {
  const [mainUser, setMainUser] = useState({})

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={ <Register mainUser = {mainUser} setMainUser={setMainUser} />}/>
          <Route path='/loginUser' element={ <Login mainUser = {mainUser} setMainUser={setMainUser} />}/>
          <Route path='/homepage' element={ <HomePage mainUser = {mainUser} setMainUser={setMainUser} />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

