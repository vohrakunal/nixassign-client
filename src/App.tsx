import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './Router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{ backgroundColor: "#fdfefe", minHeight: "100vh" }}>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
