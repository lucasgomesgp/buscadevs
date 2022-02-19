import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { User } from "./pages/User";
import "./global.css";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
}

export default App;
