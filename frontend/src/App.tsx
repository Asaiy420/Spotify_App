
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthCallbackPage from "./pages/AuthCallbackPage";
function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/auth-callback" element = {<AuthCallbackPage />} />
      </Routes>
    </>
  );
}

export default App;
