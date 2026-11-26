import { BrowserRouter as Router, Routes, Route } from "react-router";
import LandingPage from "./pages/landing"
import Authentication from "./pages/authentication"
function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route path="/auth" element={<Authentication/>} />
          <Route path="/" element={<LandingPage/>} />
          

        </Routes>

      </Router>
    </>
  )
}

export default App
