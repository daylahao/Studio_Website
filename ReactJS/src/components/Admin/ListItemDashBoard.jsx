import React, { useEffect, useState } from "react";
import { apiItems } from "../../services/ApiListProducts";
import { set } from "lodash";
import { Button, Tab, Image, Col, Row } from "react-bootstrap";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
function ListItemDashBoard(props) {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let action = searchParams.get("insert");
  let [idItem, setIdItem] = React.useState();
  const [keySearch, setKeySearch] = useState("");
  let [isFetching, setIsFetching] = React.useState(true);
  const [listItem, setListItem] = React.useState([]);
  const [dataitem, setDataItem] = React.useState();
  const [file, setFile] = useState();
  const [listImage, setListImage] = useState([]);
  const [listOptionType, setListOptionType] = useState([]);
  const handleChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
      setDataItem({ ...dataitem, image: e.target.files[0] });
    }
  };
  const handlesearch = (e) => {
    setKeySearch(e.target.value);
    apiItems.search(e.target.value).then((res) => {
      setListItem(res.data.data);
    });
  }
  const handlSearchItems = () => {
    searchParams.set("search", keySearch);
    navigate("/dashboard?action=products&&search=" + keySearch);
    apiItems.search(keySearch).then((res) => {
      console.log(res.data.data);
      setListItem(res.data.data);
    });
  };
  const LoadOption = () => {
    if (listOptionType) {
      apiItems.listType().then((res) => {
        setListOptionType(res.data);
      });
    }
  };
  const handleUpadteItem = () => {
    console.log(action);
    if (action == "true") {
      let form = new FormData();
      form.append("name", dataitem.name);
      form.append("price", dataitem.price);
      form.append("description", dataitem.description);
      form.append("type", dataitem.id);
      form.append("image", dataitem.image);
      console.log(form);
      apiItems.insert(form);
      navigate("/dashboard");
      window.location.reload();
      return;
    }
    let form = new FormData();
    form.append("name", dataitem.name);
    form.append("price", dataitem.price);
    form.append("description", dataitem.description);
    form.append("type", dataitem.id);
    // if(file)
    console.log(file);
    form.append("image", dataitem.image);
    // const form={
    //     name:dataitem.name,
    //     price:dataitem.price,
    //     description:dataitem.description,
    //     type:dataitem.id,
    //     image:file,
    // }
    // console.log(form);
    apiItems.update(dataitem.id_item, form);
    navigate("/dashboard");
    window.location.reload();
  };
  const handleDeleteItem = (id) => {
    apiItems.delete(id).then((res) => {
      if (res.status == 200) {
        window.location.reload();
      } else {
        alert("Xóa không thành công");
      }
    });
  };
  useEffect(() => {
    document.title = "Sản phẩm";
    idItem = searchParams.get("id");
    if (isFetching) {
      if (action == "true") {
        setDataItem({
          name: "",
          description: "",
          price: "",
          type: "",
          image: "",
        });
      } else {
        if (idItem) {
          apiItems.get(idItem).then((res) => {
            console.log(res.data);
            setDataItem(res.data[0]);
            if (res.data.length < 1) {
              // setSearchParams('id','');
              searchParams.delete("id");
              navigate("/dashboard");
              window.location.reload();
            }
          });
        } else {
          apiItems.list().then((res) => {
            // console.log(res.data);
            setListItem(res.data.data);
            console.log(listItem);
          });
        }
      }
    }
    return () => {
      setIsFetching(false);
    };
  });
  const items = (data, stt) => {
    return (
      <tr className="text-center h-100" style={{ cursor: "pointer" }}>
        <td
          onClick={() => {
            navigate("/dashboard?action=products&&id=" + data.id_item);
            window.location.reload();
          }}
        >
          {stt}
        </td>
        <td
          onClick={() => {
            navigate("/dashboard?action=products&&id=" + data.id_item);
            window.location.reload();
          }}
          className="d-none d-md-table-cell justify-content-center"
        >
          <Image src={data.image} rounded width={170}></Image>
        </td>
        <td
          onClick={() => {
            navigate("/dashboard?action=products&&id=" + data.id_item);
            window.location.reload();
          }}
        >
          {data.name}
        </td>
        <td
          onClick={() => {
            navigate("/dashboard?action=products&&id=" + data.id_item);
            window.location.reload();
          }}
          className="d-none d-md-table-cell text-center h-100"
        >
          {data.description}
        </td>
        <td
          onClick={() => {
            navigate("/dashboard?action=products&&id=" + data.id_item);
            window.location.reload();
          }}
        >
          {data.price}
        </td>
        <td
          onClick={() => {
            navigate("/dashboard?action=products&&id=" + data.id_item);
            window.location.reload();
          }}
        >
          {data.type}
        </td>
        <td className="h-100 ">
          <div className="h-100 w-100  d-flex flex-column gap-2 justify-content-center align-items-center">
            <Button
              variant="warning"
              onClick={() => {
                navigate("/dashboard?action=products&&id=" + data.id_item);
                window.location.reload();
              }}
            >
              Sửa
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDeleteItem(data.id_item);
              }}
            >
              Xóa
            </Button>
          </div>
        </td>
      </tr>
    );
  };
  const listitem = () => {
    let list = [];
    for (let index = 0; index < 20; index++) {
      list.push(items(index));
    }
    return list;
  };
  if (dataitem) {
    return (
      <div
        className="p-3 d-flex flex-column overflow-hidden"
        style={{ height: "70vh", color: "var(--black)" }}
      >
        <header className="w-100 align-items-end d-flex justify-content-end gap-3 my-2">
          <Button
            variant="outline-success px-3"
            onClick={() => {
              navigate("/dashboard?action=products");
              window.location.reload();
            }}
          >
            <i class="bi bi-arrow-return-left"></i> Quay lại
          </Button>
        </header>
        <Row>
          <Col>
            <h2>Hình ảnh</h2>
          </Col>
          <Col>
            <h2>Thông tin sản phẩm</h2>
          </Col>
        </Row>
        <Row className="h-100 overflow-hidden d-flex flex-row w-100">
          <Col xs={4} className=" d-flex align-items-center overflow-hidden ">
            <div className="border h-100 w-100 border-2 border-success rounded-3">
              <div
                id="avatarThumbDashBoardChange"
                className=" h-100 position-relative "
                style={{ width: "100%" }}
                onClick={() => {
                  document.getElementById("importthumbnail").click();
                }}
              >
                <Image
                  id=""
                  src={file ? file : dataitem.image}
                  className="w-100 position-absolute translate-middle-y"
                  style={{ paddingTop: "100%" }}
                ></Image>
                <p
                  id="labelavatarthumbdashboardchange"
                  className="position-absolute translate-middle-y w-100 text-center h-100 top-0 bottom-0"
                >
                  Thay Đổi Ảnh
                </p>
                <input
                  id="importthumbnail"
                  type="file"
                  className="w-100 d-none"
                  onChange={handleChange}
                  name="importthumbnail"
                ></input>
              </div>
            </div>
          </Col>
          <Col xs={8} className="gap-2 d-flex flex-column">
            <label>Tên</label>
            <textarea
              value={dataitem.name}
              className="w-100 form-control"
              maxLength={60}
              style={{ resize: "none" }}
              onChange={(e) => {
                setDataItem({ ...dataitem, name: e.target.value });
              }}
            ></textarea>
            <label>mô tả</label>
            <textarea
              value={dataitem.description}
              className="w-100 form-control"
              maxLength={60}
              style={{ resize: "none" }}
              onChange={(e) => {
                setDataItem({ ...dataitem, description: e.target.value });
              }}
            ></textarea>
            <label>Giá</label>
            <input
              className="form-control"
              value={dataitem.price}
              onChange={(e) => {
                setDataItem({ ...dataitem, price: e.target.value });
              }}
            ></input>
            <label>Loại thiết bị</label>
            <select
              class="form-select"
              aria-label="Default select example"
              onClick={LoadOption}
              onSelect={(e) => {
                setDataItem({
                  ...dataitem,
                  type: listOptionType.find(
                    (item) => item.id == e.target.value
                  ),
                  id: e.target.value,
                });
              }}
              onChange={(e) => {
                setDataItem({
                  ...dataitem,
                  type: listOptionType.find((item) => item.id == e.target.value)
                    .type,
                  id: e.target.value,
                });
              }}
            >
              <option selected>{dataitem.type}</option>
              {listOptionType ? (
                listOptionType.map((item) => {
                  if (item.type == dataitem.type) {
                    return null;
                  }
                  return <option value={item.id}>{item.type}</option>;
                })
              ) : (
                <option>Đang tải</option>
              )}
            </select>
          </Col>
        </Row>
        <Row className="w-100 align-items-end d-flex justify-content-end gap-3 my-2 ">
          <Col xs={12} md={2} className="justify-content-end d-flex">
            <Button
              variant="success"
              className="w-100"
              onClick={handleUpadteItem}
            >
              Lưu
            </Button>
          </Col>
          <Col xs={12} md={2} className="justify-content-end d-flex">
            <Button
              variant="danger w-100"
              onClick={() => {
                navigate("/dashboard?action=products");
                window.location.reload();
              }}
            >
              Hủy
            </Button>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div
        className="p-3 d-flex flex-column overflow-hidden "
        style={{ height: "70vh" }}
      >
        <header className="w-100 align-items-end d-flex justify-content-end gap-3 my-2">
          <Button
            variant="success px-3"
            onClick={() => {
              navigate("/dashboard?action=products&&insert=true");
              window.location.reload();
            }}
          >
            Thêm +
          </Button>
          <div className="d-flex h-100 gap-2 mx-2">
            <input
              className="form-control"
              placeholder="Tìm kiếm "
              value={keySearch}
              onChange={handlesearch}
            ></input>
            <Button
              className="btn-success rounded-circle m-auto"
              onClick={handlSearchItems}
            >
              <i class="bi bi-search"></i>
            </Button>
          </div>
        </header>
        <div
          className="w-100  h-100"
          style={{
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <table className="table table-hover">
            <thead
              style={{
                position: "sticky",
                top: "0",
              }}
            >
              <tr className="text-center">
                <th>STT</th>
                <th className="d-none d-md-table-cell">Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th className="d-none d-md-table-cell">Mô tả</th>
                <th>Giá</th>
                <th>Loại</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {listItem.map((item, index) => {
                // console.log(item);
                return items(item, index);
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListItemDashBoard;
