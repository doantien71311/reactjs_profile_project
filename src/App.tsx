import "./App.css";
import "./assets/fontawesome/css/all.min.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
