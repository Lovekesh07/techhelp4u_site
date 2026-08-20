import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Tracks from "./pages/Tracks";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Join from "./pages/Join";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="tracks" element={<Tracks />} />
          <Route path="events" element={<Events />} />
          <Route path="team" element={<Team />} />
          <Route path="join" element={<Join />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
