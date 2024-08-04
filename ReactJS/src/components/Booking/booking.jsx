import React, { useEffect } from 'react';
import Slideshow from "../slideshow";
import Listalbum from "./listAlbum";
import {apiAlbums} from '../../services/ApiAlbums';
import { set } from 'lodash';
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
function Booking(props) {
  const [isFetching, setIsFetching] = React.useState(true);
  const [listAlbum, setListAlbum] = React.useState([]);
  useEffect(() => {
    document.title = "Dịch vụ";
      apiAlbums.list().then((res) => {
        if (isFetching) {  
          console.log(res.data);
          setListAlbum(res.data);
        }
        });
    return () => {setIsFetching(false)};

  });  
  return (
        <div
        className="container-xxl p-0 h-100 flex-fill d-flex flex-column shadow-lg "
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
        <div className='text-dark'>
          <h1 className='w-100 text-center p-3'>Dịch vụ</h1>
          <div className='d-flex flex-row align-items-center'>
          <div className='rounded-3 text-center d-flex flex-row p-2 h2'>
          <p className='text-center m-auto'>Concept</p>
          </div>
          <hr className='w-100'></hr>
          </div>
          <Listalbum listConcept={listAlbum} button1={"Liên hệ đặt lịch"} />
        </div>

        </div>
    );
}

export default Booking;