import React, { useEffect, useState, useContext, createContext } from "react";
import { Link, useRouteLoaderData, useSearchParams,useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Slideshow from "../slideshow";
import ListLeft from "./listGroupLeft";
import ListCards from "./equipmentGroupCards";
import PopupDate from "./popupDate";
import { apiItems } from "../../services/ApiListProducts";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import { set } from "lodash";
const listImage = [
  {
    url: "https://d2ub1k1pknil0e.cloudfront.net/media/images/camera-photography.2e16d0ba.fill-1200x630.format-jpeg.jpg",
    title: "First slide",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    url: "https://d2ub1k1pknil0e.cloudfront.net/media/images/camera-photography.2e16d0ba.fill-1200x630.format-jpeg.jpg",
    title: "Secound slide",
    description:
      "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    url: "https://img.freepik.com/free-photo/dark-blue-product-background_53876-92801.jpg",
    title: "Secound slide",
    description:
      "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    url: "https://t3.ftcdn.net/jpg/00/35/94/44/360_F_35944424_YGSDMaCU6PCosD5W3xuH7wdUPMTpkkp8.jpg",
    title: "Secound slide",
    description:
      "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    url: "https://d2ub1k1pknil0e.cloudfront.net/media/images/camera-photography.2e16d0ba.fill-1200x630.format-jpeg.jpg",
    title: "Secound slide",
    description:
      "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    url: "https://img.freepik.com/free-photo/dark-blue-product-background_53876-92801.jpg",
    title: "Secound slide",
    description:
      "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    url: "https://t3.ftcdn.net/jpg/00/35/94/44/360_F_35944424_YGSDMaCU6PCosD5W3xuH7wdUPMTpkkp8.jpg",
    title: "Secound slide",
    description:
      "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
];
export const Popupcontext = createContext();
const limitItem = 6;
function Equipment(props) {
  const navigate = useNavigate();
  const [keysearch, setKeysearch] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  let pagequery = searchParams.get("page");
  let searchQuery = searchParams.get("search");
  const [dataPopup, setDataPopup] = useState({ show: false });
  const [listData, setListData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  let [listPage,setListPage] = useState([]);
  const handlepage = (total) => {
    var page = Math.round(total/limitItem);
    var listpagetemp = [];
    for(let i = 1; i <=page; i++){
      listpagetemp.push(<Pagination.Item key={i} active={i === Number(pagequery)} linkStyle={{}} linkClassName="btn-outline-success" onClick={()=>{
        navigate("?page="+i);
        setIsFetching(true);
      }}>{i}</Pagination.Item>);
    }
    setListPage(listpagetemp);
  }
  useEffect(() => {
    if (!searchQuery) {
      if(!pagequery){
        navigate("?page=1");
      }else{
      apiItems.ListLimit((pagequery-1)*limitItem,limitItem).then((res) => {
        if (isFetching) {
          setListData(res.data.data);
          console.log(res.data.data);
          handlepage(res.data.Total_Item);
        }
      });
      return () => {
        setIsFetching(false);
      };
    }
    } else {
      apiItems.search(searchQuery).then((res) => {
        if (isFetching) {
          setListData(res.data.data);
          setKeysearch(searchQuery);
        }
      });
      return () => {
        setIsFetching(false);
      };
    }
  });
  if (isFetching) {
    return <div>Loading...</div>; // Hiển thị loading trong khi fetching
  } else {
    return (
      <Popupcontext.Provider
        value={[
          { dataPopup, setDataPopup },
          { isFetching, setIsFetching },
        ]}
      >
        <div
          className="container-xxl p-0 h-100 flex-fill d-flex flex-column "
          style={{
            color: "var(--white)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div style={{ height: "33.3333333333vh" }}>
            <Slideshow
              listImage={listImage}
              description={false}
              controls={false}
              indicators={false}
              css={"height: 33.3333333333vh"}
              height="33.3333333333vh"
            />
          </div>
          <containter className="p-3 d-flex flex-column h-100 flex-fill">
            <header className="d-flex flex-column flex-md-row gap-3 mb-3">
              <h1
                className="h2 col-12 col-md-4 text-center text-md-start"
                style={{ color: "var(--black)" }}
              >
                Thuê Thiết bị
              </h1>
              <div className="d-flex position-relative col-12 col-md-8">
                <input
                  type="text"
                  className="form-control col-12 rounded-5 pe-5"
                  placeholder="Tìm kiếm"
                  onChange={(e) => {
                    setKeysearch(e.target.value);
                  }}
                  value={keysearch}
                ></input>
                <Link
                  to={"?search=" + keysearch}
                  onClick={() => setIsFetching(true)}
                  className="btn btn-outline-success rounded-circle position-absolute p-md-3 end-0 translate-middle-y top-50 d-flex flex-row justify-content-center align-items-center"
                  style={{
                    color: "var(--white)",
                    background: "var(--green)",
                    maxHeight: "100%",
                  }}
                >
                  <i class="bi bi-search"></i>
                </Link>
              </div>
            </header>
            <div className="w-100 d-flex flex-md-row flex-fill flex-column gap-3">
              <div className="col-md-3 d-flex flex-column rounded-3 ">
                <h5 className="h5" style={{ color: "var(--black)" }}>
                  Danh mục
                </h5>
                <ListLeft className="w-100 col-12 shadow-lg flex-fill d-flex  h-100 " />
              </div>
              <div
                className="col-md-9 p-0 p-md-3 flex-column d-flex  shadow-lg  rounded-3"
                style={{ background: "var(--white)" }}
              >
                {isFetching ? (
                  <div
                    className="h-100 text-center w-100 d-flex justify-content-center align-items-center"
                    style={{ color: "var(--black)" }}
                  >
                    Loading...
                  </div>
                ) : (
                  <ListCards ListProducts={listData} />
                )}
                {/* <ListCards ListProducts={listData}/> */}
              {
              (listPage.length > 0 && pagequery)?(
              <Pagination className="col-6 ms-auto d-flex justify-content-end success">
               {listPage} 
              </Pagination>
              ):(null)}
              </div>
            </div>
          </containter>
        </div>
      </Popupcontext.Provider>
    );
  }
}
export default Equipment;
