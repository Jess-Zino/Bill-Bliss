import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Pages/Auth/Login'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
    </Routes>
  )
}

export default App
