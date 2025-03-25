import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavComp from "./components/NavComp";
import Quiz from "./components/quiz/Quiz";
import List from "./components/list/List";
function App() {


  return (
    <>
         <Router> {/* Router でラップ */}
      <NavComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/list" element={<List />} />
        {/* <Route path="/list" element={<List />} /> */}
      </Routes>
    </Router>

    </>
  )
}

export default App
