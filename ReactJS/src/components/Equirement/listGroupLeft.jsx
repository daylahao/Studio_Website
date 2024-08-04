import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import React, { useContext, useEffect, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Button, Dropdown } from "react-bootstrap";
import { apiItems } from "../../services/ApiListProducts";
import { Popupcontext } from "./equipment";
import { Link } from "react-router-dom";
const listoption = [
  { name: "Tất cả", link: "/equipment" },
  { name: "Máy ảnh", link: "?search=Máy ảnh" },
  { name: "Máy ảnh", link: "?search=Máy ảnh" },
];
function ListGroupLeft({ className, Options }) {
  const { isfetching, setIsFetching } = useContext(Popupcontext)[1];
  const [isfetching_type, setIsfetching_type] = useState(true);
  const [listoption, setListoption] = useState([]);
  useEffect(() => {
    apiItems.getAllType().then((res) => {
      if (isfetching_type) {
        setListoption(res.data);
      }
    });
    return () => {
      setIsfetching_type(false);
    };
  });
  if (listoption.length == 0) {
    return <div>Loading...</div>;
  } else
    return (
      <ListGroup variant="flush" action className={className}>
        <Dropdown className="d-block d-md-none">
          <Dropdown.Toggle className="form-control btn-success">
            Danh mục
          </Dropdown.Toggle>
          <Dropdown.Menu className="form-control p-0">
            <ListGroup.Item action variant="light" >
            <Link
              to={"?search="}
              onClick={() => setIsFetching(true)}
              style={{ color: "var(--black)", textDecoration: "none" }}
            >
              <Row>
                <Col className="text-center text-md-start">Tất cả</Col>
                <Col sm={1} className="d-none d-md-block">
                  <i class="bi bi-caret-right-fill"></i>
                </Col>
              </Row>
              </Link>
            </ListGroup.Item>
            {listoption.map((item, index) => {
              return (
                <ListGroup.Item
                  action
                  variant="light"
                  href={"?search=" + item.type}
                >
                  <Link
                  to={"?search=" + item.type}
                  onClick={() => setIsFetching(true)}
                  style={{ color: "var(--black)", textDecoration: "none" }}
                >
                    <Row>
                      <Col className="text-center text-md-start">
                        {item.type}
                      </Col>
                      <Col sm={1} className="d-none d-md-block">
                        <i class="bi bi-caret-right-fill"></i>
                      </Col>
                    </Row>
                  </Link>
                </ListGroup.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <div className="d-none d-md-flex flex-column flex-fill h-100 rounded-2">
          <ListGroup.Item action variant="light" href={"?search="}>
            <Link
            preventScrollReset={true}
              to={"?page=1"}
              onClick={() => setIsFetching(true)}
              style={{ color: "var(--black)", textDecoration: "none" }}
            >
              <Row className="p-0 p-md-3">
                <Col className="text-center text-md-start">Tất cả</Col>
                <Col sm={1} className="d-none d-md-block">
                  <i class="bi bi-caret-right-fill"></i>
                </Col>
              </Row>
            </Link>
          </ListGroup.Item>
          {listoption.map((item, index) => {
            return (
              <ListGroup.Item
                action
                variant="light"
                // href={"?search=" + item.type}
              >
                <Link
                  to={"?search=" + item.type}
                  onClick={() => setIsFetching(true)}
                  style={{ color: "var(--black)", textDecoration: "none" }}
                  preventScrollReset={true}
                >
                  <Row className="p-0 p-md-3">
                    <Col className="text-center text-md-start">{item.type}</Col>
                    <Col sm={1} className="d-none d-md-block">
                      <i class="bi bi-caret-right-fill"></i>
                    </Col>
                  </Row>
                </Link>
              </ListGroup.Item>
            );
          })}
        </div>
      </ListGroup>
    );
}

export default ListGroupLeft;
