import UserProfileView from "./pages/profile";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/claim" element={<UserProfileView />} />
      {/* <Route path="/test" element={<TestUpload />} /> */}
    </Routes>
  );
}

export default App;
