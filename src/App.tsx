import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SignUpPage from "./view/SignUpPage";
import { createUser, signIn } from "./controllers/UserController";
import SignInPage from "./view/SignInPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<SignUpPage createUser={createUser} />} />
        <Route path="/signin" element={<SignInPage signIn={signIn}></SignInPage>} />
        <Route path="/signup" element={<SignUpPage createUser={createUser}></SignUpPage>} />
      </Routes>
    </Router>
  );
}

export default App;
