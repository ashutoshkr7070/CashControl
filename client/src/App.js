import HomePage from "./pages/HomePage";
import {Routes, Route, Navigate} from 'react-router-dom'
import Register from "./pages/Register";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/add-expense" element={<AddExpense />} /> */}
        <Route path="/add-expense" element={<ProtectedRoutes><HomePage/></ProtectedRoutes>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}
export function ProtectedRoutes(props) {
  if(localStorage.getItem('user')){
    return props.children
  }
  else{
    return <Navigate to="/login"/>
  }
}


export default App;
