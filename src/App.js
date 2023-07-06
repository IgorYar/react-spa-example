import { Routes, Route } from "react-router-dom";
import { ABOUT, MAIN, USER_DETAILS } from "./helpers/url";
import Posts from "./pages/Posts";
import About from "./pages/About";
import UserDetails from "./pages/UserDetails";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={MAIN} element={<Posts />} />
                <Route path={ABOUT} element={<About />} />
                <Route path={USER_DETAILS} element={<UserDetails />} />
            </Routes>
      </div>
    );
}

export default App;