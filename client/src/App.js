import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";
import About from "./views/About";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import SkillContextProvider from "./contexts/SkillContext";

function App() {
  return (
    <AuthContextProvider>
      <SkillContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth authRoute="login" />} />
            <Route path="/register" element={<Auth authRoute="register" />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute component={Dashboard} />}
            />
            <Route
              path="/about"
              element={<ProtectedRoute component={About} />}
            />
          </Routes>
        </Router>
      </SkillContextProvider>
    </AuthContextProvider>
  );
}

export default App;
