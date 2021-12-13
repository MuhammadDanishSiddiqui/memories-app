import './App.css';
import { useEffect } from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Container from '@material-ui/core/Container';
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"


axios.defaults.baseURL = "http://localhost:5000"



function App() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch({ type: "LOGIN", payload: JSON.parse(localStorage.getItem("user")) })
      axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
    }
  }, [])


  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        {!user ?.isAuth ? <Route path="/signup" element={<Signup />} /> : <Route path="*" element={<Navigate to="/" />} />}
        {!user ?.isAuth ? <Route path="/login" element={<Login />} /> : <Route path="*" element={<Navigate to="/" />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
