import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./assets/fontawesome/css/all.min.css";
import { NavLink } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <NavLink to="administrator" target="_blank">
          Administrator
        </NavLink>
        <NavLink to="profile/71311">Profile</NavLink>
        <NavLink to="fukuda-son-dondathang/71311">Fuku da đơn hàng</NavLink>
        {/* <button>Administrator</button> */}
        <a href="https://vite.dev">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Software MrTien71311</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
