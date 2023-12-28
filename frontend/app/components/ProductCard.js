'use client'
import { HeartFilled, HeartOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { motion } from 'framer-motion';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, updateWishlist } from "../helpers/ApiHelper";
import { setCart, setWishlist } from "../redux/feature/account/accountSlice";

const { Card, Button } = require("antd")

const ProductCard = (props) => {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist);
    const isGuest = useSelector(state => state.isGuest);
    const cart = useSelector(state => state.cart)
    const [wishlisted, setWishlisted] = useState(false);

    const handleWishlist = async (key) => {
        const res = await updateWishlist(key);
        if (res?.status === 200) {
            const data = await res.json();
            dispatch(setWishlist(data?.product_keys));
        }
    }

    const handleAddCart = async (produtkey, qty) => {
        const data = await addCart(produtkey, qty);
        if (data) {
            console.log('data', data);
            dispatch(setCart({ "cart": data?.cart }));
        }
    }
    const handleRemoveCart = async (produtkey, qty) => {
        const data = await addCart(produtkey, qty);
        if (data) {
            console.log('data', data);
            dispatch(setCart({ "cart": data?.cart }));
        }
    }
    useEffect(() => {
        setWishlisted(wishlist?.includes(props?.data?.prod_key));
    }, [wishlist]);

    return <div className="flex-col justify-center h-full">

        <Card bodyStyle={{ display: 'flex', flexDirection: 'column', flexGrow: '1', justifyContent: 'space-between' }} className="relative h-full flex flex-col" bordered={false} cover={<img alt="product" src={props?.data?.image_path[0]} className="object-cover min-h-[240px]" />} style={{ width: 240 }} hoverable >
            <Link href={`/products/${props?.data?.prod_key}`} className="!text-black">
                <div className="flex-col items-center justify-center leading-6">
                    <h3 className="font-bold">{props?.data?.name}</h3>
                    <h3 className="font-light text-sm line-clamp-4">{props?.data?.description}</h3>
                    <h3 className="text-xl font-bold pt-4">${props?.data?.price}</h3>
                </div>
                <div className="absolute top-3 left-3 flex flex-col">
                    {props?.data?.discount && <div className="px-2 m-2 bg-red-600 rounded">
                        <h3 className="text-white text-center">{props?.data?.discount} % off</h3>
                    </div>}
                    <div className="px-2 m-2 bg-orange-500 rounded">
                        <h3 className="text-white text-center">{props?.data?.quantity <= 5 ? `${props?.data?.quantity} left` : ''}</h3>
                    </div>
                </div>
            </Link>
            {!isGuest && <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.2 }} transition={{ duration: 0.3 }} className="absolute top-3 right-3 pointer-events-auto" onClick={() => setWishlisted(!wishlisted)}>
                {wishlisted ? <HeartFilled className="text-xl" style={{ color: 'red' }} onClick={() => handleWishlist(props?.data?.prod_key)} /> : <HeartOutlined className="text-xl" onClick={() => handleWishlist(props?.data?.prod_key)} />}
            </motion.div>}

            {cart?.cart?.length > 0 && (cart?.cart.map((item) => (item?.product_key)).includes(props?.data?.prod_key)) ? <div className="flex flex-row w-full justify-between">
                <Button onClick={() => handleRemoveCart(props?.data?.prod_key, -1)} icon={<MinusOutlined />} className="mt-2 w-full bg-gray-400 text-white self-end hover:!text-white hover:!bg-orange-400 border-0" />
                <div className="flex items-center font-bold text-orange-600">{cart?.cart?.find((item) => item.product_key === props?.data?.prod_key).qty}</div>
                <Button onClick={() => handleAddCart(props?.data?.prod_key, 1)} icon={<PlusOutlined />} className="mt-2 w-full bg-orange-500 text-white self-end hover:!text-white hover:!bg-orange-400 border-0" />
            </div> : <div className="flex-col">
                <Button onClick={() => handleAddCart(props?.data?.prod_key, 1)} className="mt-2 w-full bg-orange-500 text-white self-end hover:!text-white hover:!bg-orange-400 border-0">Add to cart</Button>
            </div>}
        </Card>
    </div >
}
export default ProductCard;