import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Router,Route, Routes} from "react-router-dom";
import Home from './email';
import ShowMail from './email/showmail';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='showfullmail' element={<ShowMail></ShowMail>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
