import "./App.css";
import Home from "./components/Home/Home";
import CreateDog from "./components/CreateDog/CreateDog";
import Navbar from "./components/Navbar/Navbar";
import DogDetails from "./components/DogDetails/DogDetails";
import Landing from "./components/Landing/Landing";
import Favorites from "./components/Favorites/Favorites";
import Empty from "./components/Empty/Empty";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth0ProviderWithHistory from "./components/Auth/Auth0ProviderWithHistory";

function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dogs" element={<Home />} />
          <Route path="/dogs/create-dog" element={<CreateDog />} />
          <Route path="/dogs/favorites" element={<Favorites />} />
          <Route path="/dogs/:name" element={<DogDetails />} />
          <Route path="*" element={<Empty />} />
        </Routes>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  );
}

export default App;
