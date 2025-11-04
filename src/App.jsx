import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/organisms/navbar"
import { HomePage } from "./components/pages/homePage"
import { StudentPage } from "./components/pages/studentsPage"

function App() {
  /* 
    TODO: Grupo 1: Ruta raiz -> Landing page tienda de cursos
    TODO: Grupo 2: Ruta /estudiantes -> panel para gestionar estudiantes
    TODO: Grupo 3: Ruta /profesores -> panel para gestionar profesores
    TODO: Grupo 4: Ruta /cursos -> panel para gestionar cursos
  */
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/estudiantes" Component={StudentPage} />
      </Routes>
    </>
  )
}

export default App
