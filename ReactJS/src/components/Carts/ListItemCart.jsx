import React, { useContext,useEffect,useState } from 'react';
import { apiCarts } from '../../services/ApiCarts';
import Itemcarts from './Itemcarts';
import { ListContext } from './carts';
function ListItemCart(props) {
    const [listitem, setListitem] = useState([]);
    const [isfetching, setIsFetching] = useState(true);
    const {listCards,setListCards} = useContext(ListContext)[0];
    const {isHandleTotal, setIsHandleTotal} = useContext(ListContext)[1];
    useEffect(() => {
        apiCarts.listitems().then((res) => {
            if(isfetching){
                console.log(res.data);
                setListitem(res.data);
            }
        });
        return () => {
            setIsFetching(false);
        }
    });
    if(isfetching){
        return <div>Loading...</div>;
    }
    if(listitem.length === 0){
        return <div className='d-flex w-100 text-center justify-content-center p-5 rounded-3'>Không có sản phẩm nào trong giỏ hàng</div>;
    }
    else{
        setListCards(listitem);
        return (
        <div>
            {listitem.map((item, index) => {
                if(item === undefined) return <div>Loading...</div>;
                else
                return (
                    <Itemcarts itemdata={item} id={index}></Itemcarts>
            )})}
        </div>
    );
}
}

export default ListItemCart;