import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Hero from './pages/Home'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <section id="">
      </section>
    </>
  )
}

export default App
