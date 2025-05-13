import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./Components/Context/UserContext.jsx";
import CoachProvider from "./Components/Context/CoachContext.jsx";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")).render(

  <Router>
    <ToastContainer position="top-right" autoClose={3000} />
    <CoachProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CoachProvider>
  </Router>

);
