import { Routes, Route } from "react-router-dom";
import { Protector, ProtectorAccount } from "../Helper/login";
import Home from "../Pages/Home";
import Login from "../Pages/Logar";
import App from "../App";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" 
      element={
        <ProtectorAccount>
          <Home />
        </ProtectorAccount>
      }
      />
      <Route
        path="/logar"
        element={
          <ProtectorAccount>
            <Login />
          </ProtectorAccount>
        }
      />
      <Route
        path="/taskmanager"
        element={
          <Protector>
            <App />
          </Protector>
        }
      />
    </Routes>
  );
}
