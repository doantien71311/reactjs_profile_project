import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./assets/fontawesome/css/all.min.css";
import { NavLink, Outlet } from "react-router-dom";

function AppOld() {
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

      <Outlet />
    </>
  );
}

export default AppOld;
