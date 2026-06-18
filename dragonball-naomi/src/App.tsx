import { BrowserRouter, Route, Routes } from "react-router-dom"
import CharacterDetail from "./pages/CharacterDetail"
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personaje/:id" element={<CharacterDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
