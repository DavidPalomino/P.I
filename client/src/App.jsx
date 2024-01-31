import "./App.css";
import { Routes, Route } from 'react-router-dom';
import LandingPage from "./Components/Views/LandingPage/LandingPage";
import HomePage from "./Components/Views/HomePage/HomePage"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;