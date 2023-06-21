import { Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";
import About from "./components/About";
import UserDetails from "./components/UserDetails";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route index element={<Posts />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:userId" element={<UserDetails />} />
            </Routes>
      </div>
    );
}

export default App;