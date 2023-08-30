import { Route, Routes } from "react-router-dom";
import Login from "./User/Login";
import Signup from "./User/Signup";
import MainPage from "./MainPage";

export default function UserRouter(){
    return(
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}