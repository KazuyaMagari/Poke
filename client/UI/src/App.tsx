import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavComp from "./components/NavComp";
import Quiz from "./components/quiz/Quiz";
function App() {


  return (
    <>
      <NavComp />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
