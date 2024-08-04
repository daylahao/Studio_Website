import React, { useEffect, useState } from "react";
import ReactCurvedText from "react-curved-text";
import SlideImage from "../slideshow";
import Button from "react-bootstrap/esm/Button";
import ListImageGallery from "../listImageGallery";
import ListAlbum from "../listAlbum";
import {apiAlbums} from '../../services/ApiAlbums'
const listImage = [
  {
    url: "https://d2ub1k1pknil0e.cloudfront.net/media/images/camera-photography.2e16d0ba.fill-1200x630.format-jpeg.jpg",
    title: "First slide",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    url:"/image/bg_home_4.jpg",
    title: "Secound slide",
    description:
      "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  // {
  //   url: "https://img.freepik.com/free-photo/dark-blue-product-background_53876-92801.jpg",
  //   title: "Secound slide",
  //   description:
  //     "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
  // },
  // {
  //   url: "https://t3.ftcdn.net/jpg/00/35/94/44/360_F_35944424_YGSDMaCU6PCosD5W3xuH7wdUPMTpkkp8.jpg",
  //   title: "Secound slide",
  //   description:
  //     "Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.Nulla vitae elit libero, a pharetra augue mollis interdum.",
  // },
];
const ListTitleAbout = [
 {
  url:"/image/bg_home_1.jpg",
  title:"Đam mê ghi dấu khoảnh khắc",
  description:"Chúng tôi là đội ngũ nhiếp ảnh gia và nhà làm phim trẻ trung, giàu kinh nghiệm, luôn đam mê với việc ghi lại những khoảnh khắc đẹp và ý nghĩa trong cuộc sống. Với sự tận tâm và chuyên nghiệp, chúng tôi cam kết mang đến cho bạn những sản phẩm chất lượng cao và dịch vụ tận tâm."
},
{
  url:"/image/bg_home_2.jpg",
  title:"Dịch vụ đa dạng, đáp ứng mọi nhu cầu",
  description:"Chúng tôi cung cấp đa dạng các dịch vụ chụp ảnh và quay phim, từ ảnh cưới, ảnh chân dung, ảnh sản phẩm đến phim quảng cáo, phim doanh nghiệp. Chúng tôi cũng cho thuê các thiết bị quay phim, chụp ảnh hiện đại với giá cả hợp lý."
},
{
  url:"/image/bg_home_3.jpg",
  title:"Phong cách độc đáo, sáng tạo không ngừng",
  description:"Chúng tôi luôn tìm tòi, sáng tạo để mang đến cho bạn những phong cách chụp ảnh và quay phim độc đáo, ấn tượng. Mỗi sản phẩm của studio đều là một tác phẩm nghệ thuật, thể hiện cá tính và câu chuyện riêng của bạn."
}
]
const ListService = [
  {
    url: "./image/thumbnail_home_1.jpg",
    title: "Chụp Ảnh Concept ",
    subtitle:"\"Nơi Nghệ Thuật Gặp Gỡ Sáng Tạo\"",
    description:
      "Chụp ảnh concept là dịch vụ chụp ảnh sáng tạo, độc đáo, thể hiện phong cách và cá tính riêng của bạn. Chúng tôi sẽ giúp bạn thực hiện ý tưởng chụp ảnh độc đáo, ấn tượng, thể hiện cá tính và câu chuyện riêng của bạn.",
    link:'/booking'
    },
  {
    url: "./image/thumbnail_home_2.jpg",
    title: "Thuê Thiết Bị Chụp Ảnh",
    subtitle:"\"Chất Lượng Cao, Giá Cả Hợp Lý!\"",
    description:"Chúng tôi cung cấp dịch vụ cho thuê thiết bị chụp ảnh hiện đại, chất lượng cao với giá cả hợp lý. Bạn có thể dễ dàng thuê máy ảnh, ống kính, đèn flash, tripod, phụ kiện chụp ảnh khác với giá cả hợp lý.",
    link:"/equipment"
  },
  {
    url: "./image/thumbnail_home_3.jpg",
    title: "Thuê Phòng Chụp Ảnh/Quay Phim",
    subtitle:"\"Sẵn Sàng Cho Buổi Chụp Ảnh/Quay Phim Hoàn Hảo?\"",
    description:"Chúng tôi cung cấp dịch vụ cho thuê phòng chụp ảnh, quay phim với không gian rộng rãi, hiện đại, thiết bị chuyên nghiệp. Bạn có thể dễ dàng thuê phòng chụp ảnh, quay phim với giá cả hợp lý.",
    link:'/booking'
  }
]
const ListGallery = [
  {
    name: "Ảnh Cưới",
    imagepath: ["./image/bg_Home_6.jpg"],
  },
  {
    name: "Ảnh Cưới",
    imagepath: ["./image/bg_Home_7.jpg"],
  },
  {
    name: "Ảnh Cưới",
    imagepath: ["./image/bg_Home_8.jpg"],
  },
  {
    name: "Ảnh Cưới",
    imagepath: ["./image/bg_Home_9.jpg"],
  },
  {
    name: "Ảnh Cưới",
    imagepath: ["./image/bg_Home_10.jpg"],
  },
  {
    name: "Ảnh Cưới",
    imagepath: ["./image/bg_Home_11.jpg"],
  }
]
const Home = () => {
  let [gallerys,setGallerys]=useState([]);
  let [isferch,setIsferch]=useState(true);
  useEffect(() => {
  // apiAlbums.listLimit(6).then(res => {
  //   if(isferch)
  //   setGallerys(res.data);
  // });
  // return () => setIsferch(false);
 });
  return (
    <div>
      <div id="Home">
        <div
          className="h-100 p-5 p-md-0 text-center align-center position-absolute top-0 start-0 end-0 bottom-0 d-flex flex-column align-self-center justify-content-center z-1 text-justify overflow-md-hidden"
          style={{
            color: "#e8e8e8",
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          <h2 className="h2">“Nơi khoảnh khắc trở thành nghệ thuật”</h2>
          <h2 className="h2 col-12 col-md-8 mx-auto text-justify">
            Khám phá dịch vụ của chúng tôi và biến khoảnh khắc của bạn thành tác
            phẩm nghệ thuật.
          </h2>
          <Button  href="/#about" className=" btngotoabout rounded-circle bg-transparent rotating-curved-text position-absolute translate-middle-x start-50 bottom-0 mb-10"
          style={{outline:'none',border:'none'}}
          >
          <button
            className="d-flex align-items-center"
            style={{ width: "50px", height: "50px", border:'none',background:'none' }}
            >
            <div style={{ borderColor:'white', borderStyle:'solid',borderWidth:'1px 1px 0px 0px',height:'30px', width:'30px',
              transform:'rotate(135deg)'
             }}></div>
          </button>
          <div style={{ width:'200px',height:'200px' }} className="position-absolute start-50 top-50 d-flex  translate-middle text-light">
          <ReactCurvedText
              width={200}
              height={200}
              cx={100}
              cy={100}
              rx={50}
              ry={50}
              startOffset={0}
              reversed={true}
              textPathProps={{ fill:'White' }}
              text="Xem thêm về chúng tôi"
              svgProps={{ className: "rotating-curved-text m-auto text-light"}}
            />
            </div>
          </Button>
        </div>
        <SlideImage
          listImage={listImage}
          description={false}
          controls={false}
          indicators={false}
        />
      </div>
      <div className="container-xxl  shadow-lg ">
      <div
        id="about"
        className=" d-flex flex-column "
        style={{ minHeight: "fit-content" }}
      >
        <h2 className="h2 p-3 p-md-5 text-center">Giới thiệu</h2>
        <SlideImage
          listImage={ListTitleAbout}
          description={true}
          height="65vh"
          css=" p-0 px-md-3 overflow-hidden flex-shrink-1"
        />
      </div>
      <div
        id="gallery"
        className="d-flex flex-column pt-5 "
        style={{ minHeight: "fit-content" }}
      >
        <h2 className="h2 p-3 p-md-5 text-center">Hình ảnh</h2>
        <ListImageGallery ListImage={ListGallery} />
      </div>
      <div id="album_booking" className="">
        <h2 className="h2 p-3 p-md-5 text-center">
             Dịch vụ
        </h2>
        <ListAlbum listConcept={ListService} button1={"Xem thêm chi tiết"} />
      </div>
      </div>
    </div>
  );
};

export default Home;
