import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Service from './pages/Service/Service'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Error from './pages/Error/Error'
import Logout from './pages/Logout/Logout'
import Navbar from './components/Navbar/Navabr'

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/service' element={<Service />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='*' element={<Error />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
