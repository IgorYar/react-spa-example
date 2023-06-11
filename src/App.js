import React from "react";
import { Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route index element={<Posts />} />
            </Routes>
      </div>
    );
}

export default App;