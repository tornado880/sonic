import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Admin from "./pages/Admin";
import IPChecker from "./components/IPChecker";  // Import the IPChecker component

import "./App.css";

function App() {
    return (
        <div className="App">
            <Router>
                <IPChecker /> 

                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Buy" element={<Buy />} />
                    <Route path="/Admin" element={<Admin />} />
                    <Route path="*" element={<Home />} />  {/* Fallback route for unmatched paths */}
                </Routes>

                <Footer />
            </Router>
        </div>
    );
}

export default App;
