import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/layout/Header'
import Layout from './components/layout/Layout'
import Login from './auth/Login'
import Mainhome from './pages/home/Mainhome'
import Singup from './auth/Singup'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>} >
        <Route path='/login' element={<Login/>} />
        <Route path='/Signup' element={<Singup/>} />
        <Route path='/' element={<Mainhome/>} />
    </Route>
      </Routes>
    </>
  )
}

export default App
