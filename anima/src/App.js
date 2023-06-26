import 'bulma/css/bulma.min.css';
import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AboutPage from "./pages/About/index"
import MainPage from "./pages/Main/index"

function App() {
  return (
    <BrowserRouter>
   <Routes>
    <Route path="/" element={<MainPage/>}/>
    <Route path="/About" element={<AboutPage/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
