import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Nav, NavDropdown, Row, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { ContextUsers } from "../App";
import { useCookies } from "react-cookie";
import Logout from "./login/logout";
import { useNavigate } from "react-router-dom";
const list_Title = [
  { name: "Blog", herf: "/blog" },
  { name: "Dịch vụ", herf: "/booking" },
  { name: "Thiết bị thuê", herf: "/equipment" },
];
// Styles for the navbar and links
function Navigative(props) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handlelogout = () => {
    // alert("Logout");
    removeCookie("auth");
    removeCookie("user");
    localStorage.removeItem("key");
    navigate("/");
  };
  const Auth = () => {
    // console.log(cookies.auth);
    if (cookies.auth) {
      return true;
    } else {
      return false;
    }
  };
  const isauth = Auth();
  const [PrevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [top, setTop] = useState(0);
  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (PrevScrollpos > currentScrollPos) {
        setTop(0); // Show navbar
      } else {
        setTop(-100); // Hide navbar
      }
      setPrevScrollpos(currentScrollPos);
    };
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [PrevScrollpos]);
  const navbarStyle = {
    top: `${top}px`,
    transition: "top 0.3s",
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary fixed-top"
      style={navbarStyle}
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src={"../LOGO_BLACK.png"}
            alt="Logo"
            style={{ width: "50px" }}
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto text-center text-md-start">
            {list_Title.map((title) => {
              return <Nav.Link href={title.herf}>{title.name}</Nav.Link>;
            })}
          </Nav>
          {isauth ? (
            <Nav>
              <Button
                href="/cart"
                style={{
                  background: "none",
                  color: "var(--green)",
                  border: "none",
                }}
                className="d-flex flex-row align-items-center gap-2 w-lg-auto w-100 text-center text-lg-start justify-content-center justify-content-md-start ps-md-0"
              >
                <i
                  class="bi bi-basket2-fill  h6"
                  style={{ fontSize: "24px" }}
                ></i>
                <h5 className="d-block d-lg-none h6">Giỏ hàng</h5>
              </Button>
              {/* <Button href="/profile" style={{background:'none',color:'var(--green)',border:'none'}}><i class="bi bi-person-circle"style={{ fontSize:"24px" }}></i>
                    <div className='position-absolute translate-x-middle'>
                      <Button>Logout</Button>
                    </div>
                    </Button> */}
              <NavDropdown
                id="dropdown-basic-button"
                title={
                  <i
                    class="bi bi-person-circle h3 w-100 "
                    style={{ color: "var(--green) !important" }}
                  ></i>
                }
                variant="success bg-transparent border-0 p-1 translate-middle-x "
                style={{
                  background: "none",
                  color: "var(--green)",
                  border: "none",
                }}
                className="d-none d-lg-block"
              >
                {cookies['user'].role == "ADMIN" ? (<NavDropdown.Item href="/Dashboard">
                  <i
                    class="bi bi-person-circle  h6"
                    style={{ fontSize: "24px" }}
                  ></i>{" "}
                  Quản lí
                </NavDropdown.Item>):(null)}
                <NavDropdown.Item href="/profile">
                  <i
                    class="bi bi-person-circle  h6"
                    style={{ fontSize: "24px" }}
                  ></i>{" "}
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={handlelogout}>
                  {" "}
                  <i
                    class="bi bi-box-arrow-left h6"
                    style={{ fontSize: "24px" }}
                  ></i> Logout
                </NavDropdown.Item>
              </NavDropdown>
              <Button
                href="/profile"
                style={{
                  background: "none",
                  color: "var(--green)",
                  border: "none",
                }}
                className="d-flex d-lg-none flex-row align-items-center gap-2 text-center text-lg-start justify-content-center justify-content-md-start ps-md-0"
              >
                <i
                  class="bi bi-person-circle  h6"
                  style={{ fontSize: "24px" }}
                ></i>
                <h5 className="d-block d-lg-none h6">Thông tin</h5>
              </Button>
              <Button
                href="#"
                style={{
                  background: "none",
                  color: "var(--green)",
                  border: "none",
                }}
                onClick={handlelogout}
                className="d-flex d-lg-none flex-row align-items-center gap-2 text-center text-lg-start justify-content-center justify-content-md-start ps-md-0"
              >
                <h5 className="d-block d-lg-none h6">Đăng xuất</h5>
                <i
                  class="bi bi-box-arrow-left h6"
                  style={{ fontSize: "24px" }}
                ></i>
              </Button>
            </Nav>
          ) : (
            <Nav>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <Nav.Link href="/register">
                  <Button
                    variant="success"
                    size="md"
                    style={{ borderRadius: "30px" }}
                  >
                    Đăng kí
                  </Button>
                </Nav.Link>
                <Nav.Link href="/login">
                  <Button
                    variant="success"
                    size="md"
                    style={{ borderRadius: "30px" }}
                  >
                    Đăng nhập
                  </Button>
                </Nav.Link>
              </div>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigative;
