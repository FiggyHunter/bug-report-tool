import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login";

import BugsDashboard from "./views/BugsDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>hello root</div>} />
        <Route
          path="/hello"
          element={<div className="text-7xl">Vozdrica</div>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/bugs-overview" element={<BugsDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
