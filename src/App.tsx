import "./App.css";
import "./assets/fontawesome/css/all.min.css";
import { Outlet } from "react-router-dom";
// import { disableReactDevTools } from "@fvilers/disable-react-devtools";
// disableReactDevTools();
//
function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
