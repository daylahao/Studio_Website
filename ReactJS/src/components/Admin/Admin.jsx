import React, { useEffect } from "react";
import ListOption from "./listOption";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Nav } from "react-bootstrap";
import ListItemDashBoard from "./ListItemDashBoard";
import { useCookies } from "react-cookie";
const OptionAdmin = [{name:"Sản phẩm",action:'products',status:true}, {name:"Lịch chụp",action:'history',status:false}, {name:"Lịch Thuê thiết bị",action:'equipment',status:false}, {name:"Người dùng",action:'account',status:false}];

function Admin(props) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [action,setAction]  = React.useState(searchQuery.get("action") || "products");
  const [cookies, setCookies] = useCookies(["user"]);
  useEffect(() => {
    if(cookies['user'].role!="ADMIN"){
      navigate("/");
    }else{
      if(action==="products"){
        // navigate("/dashboard?action=products");

      }
    }
  }, []);
  return (
    <div
      className="container-xxl p-0 h-100 flex-fill d-flex flex-column "
      style={{
        color: "var(--white)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        marginTop: "68px",
      }}
    >
      <Row>
        <Col lg={3} className="d-flex align-items-stretch shadow-lg">
          <ListOption
            Options={OptionAdmin}
            className={"mt-5 h-100 w-100"}
          />
        </Col>
        <Col lg={9} className="shadow-lg rounded-3 mt-3">
          {action==="products"?(<ListItemDashBoard></ListItemDashBoard>):(null)}
          {action==="history"?(<div className=" w-100 text-dark text-center h1">Lịch sử</div>):(null)}
        </Col>
      </Row>
    </div>
  );
}

export default Admin;
