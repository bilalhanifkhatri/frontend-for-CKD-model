import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import About from "./components/aboutUs/AboutUs";
import Contact from "./components/contactUs/ContactUs";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <Router basename="/frontend-for-CKD-model">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
