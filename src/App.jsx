import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ResourceSelector from "./components/ResourceSelector";
import React from "react";
import NotFound from "./views/NotFound";
import LandingPage from "./views/LandingPage";

function App() {
  return (
    <>
      <ResourceSelector />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;