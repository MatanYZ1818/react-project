import { Route, Routes } from "react-router-dom";
import Login from "./User/Login";
import Signup from "./User/Signup";

export default function UserRouter(){
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}