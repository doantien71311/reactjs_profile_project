import Accordion from "react-bootstrap/Accordion";
// import { Navigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
// import { NavLink, useNavigate } from "react-router-dom";

export const MenuIndex = () => {
  // let navigate = useNavigate();
  console.log("MenuIndex");
  return (
    <>
      <nav
        style={{
          height: "1000px",
          backgroundColor: "red",
        }}
      >
        <Accordion defaultActiveKey={["0", "1"]} alwaysOpen={true}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Hành chính nhân sự</Accordion.Header>
            <Accordion.Body>
              {/* <Navigate to="/profile"></Navigate>; */}
              {/* <NavLink to="profile" end>
                Profile Nhân viên
              </NavLink> */}
              <NavLink to="/administrator/profile">Profile Nhân viên</NavLink>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Quản lý đơn hàng</Accordion.Header>
            <Accordion.Body>
              {/* <Navigate to="/fukuda-son-dondathang"></Navigate>; */}
              {/* <Link to="fukuda-son-dondathang">Đơn dặt hàng</Link> */}
              {/* <NavLink to="fukuda-son-dondathang" end>
                Đơn dặt hàng
              </NavLink> */}
              <NavLink to="/administrator/fukuda-son-dondathang" end>
                Đơn dặt hàng
              </NavLink>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </nav>
    </>
  );
};
