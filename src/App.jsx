import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/layout/Header'
import Layout from './components/layout/Layout'
import Login from './auth/Login'
import Mainhome from './pages/home/Mainhome'
import Singup from './auth/Singup'
import AdminLayout from './dashboard/admin/layout/AdminLayout'
import Overview from './dashboard/admin/pages/Overview'
import CardForm from './dashboard/admin/pages/CardFrom'
import CardList from './dashboard/admin/pages/CardList'
import CategoryForm from './dashboard/admin/pages/CategoryFrom'
import CategoryList from './dashboard/admin/pages/CategoryList'
import Profile from './dashboard/admin/pages/Profile'
import Settings from './dashboard/admin/pages/Settings'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>} >
        <Route path='/login' element={<Login/>} />
        <Route path='/Signup' element={<Singup/>} />
        <Route path='/' element={<Mainhome/>} />


{/* admin ki routes */}
        <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Overview />} />

        <Route path="/admin/card-form" element={<CardForm />} />
        <Route path="/admin/card-list" element={<CardList />} />

        <Route path="/admin/category-form" element={<CategoryForm />} />
        <Route path="/admin/category-list" element={<CategoryList />} />

        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>

    </Route>
      </Routes>
    </>
  )
}

export default App
