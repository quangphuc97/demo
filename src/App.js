import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import Home from "./pages/Home";
function App() {
    return (
        <>

            <Routes>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/signin" element={<SignIn />}/>
            </Routes>
        </>


    );
}
export default App;
