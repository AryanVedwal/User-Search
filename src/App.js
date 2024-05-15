import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import UserProfilePage from "./components/UserProfilePage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-800">
        <div className="max-w-7xl mx-auto py-8">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/user/:username" element={<UserProfilePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
