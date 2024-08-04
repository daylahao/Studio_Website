import React, { useEffect } from 'react';
import ListOption from '../Admin/listOption';
import {Row, Col } from "react-bootstrap";
import Information from './information';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from 'react-cookie';
// const OptionProfile = ["Thông tin cá nhân","Lịch sử","Giỏ Hàng"];
const OptionProfile = [{name:"Thông tin cá nhân",action:'products',status:true}, {name:"Lịch sử",action:'history',status:false}, {name:"Giỏ Hàng",action:'cart',status:true}];
function Profile(props) {
  const [isFetching, setIsFetching] = React.useState(true);
  const [searchQuery, setSearchQuery] = useSearchParams();
const [cookies, setCookies] = useCookies(["user"]);
  const navigate = useNavigate();
const [action,setAction]  = React.useState(searchQuery.get("action") || "products");
  useEffect(() => {
    if(isFetching){
    console.log(action)
    console.log(cookies['user']);
    if(cookies['user'].role!="ADMIN"&&cookies['user'].role!="USER"){
      navigate("/");
    }
    else{
      if(action==="products"){
        navigate("/profile?action=products");
      }
      if(action==="cart"){
        navigate("/cart");
      }
    }
  }
  return () => {
    setIsFetching(false);
  }
  });
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
        <Row className=''>
          <Col lg={3} className="d-flex align-items-stretch  boder border-2">
            <ListOption
              Options={OptionProfile}
              className={"mt-5 h-100 w-100"}
            />
          </Col>
          <Col lg={9} className="shadow-lg rounded-3 mt-3" style={{ height:'70vh' }}>
            
            <Information />
          </Col>
        </Row>
      </div>
    );
}

export default Profile;