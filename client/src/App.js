import "./App.css";
import Home from "./components/Home/Home";
import CreateDog from "./components/CreateDog/CreateDog";
import Navbar from "./components/Navbar/Navbar";
import DogDetails from "./components/DogDetails/DogDetails";
import Landing from "./components/Landing/Landing";
import Empty from "./components/Empty/Empty";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dogs" element={<Home />} />
        <Route path="/dogs/create-dog" element={<CreateDog />} />
        <Route path="/dogs/:name" element={<DogDetails />} />
        <Route path="*" element={<Empty />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
