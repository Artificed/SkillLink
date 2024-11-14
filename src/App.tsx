import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SignUpPage from "./view/SignUpPage";
import { createUser } from "./controllers/UserController";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<SignUpPage createUser={createUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
