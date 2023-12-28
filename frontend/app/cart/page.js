'use client'
import { CreditCardFilled, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Empty, Image, Input, InputNumber, Row, Space, notification } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, checkoutCart, fetchCart, updateWishlist } from "../helpers/ApiHelper";
import { setCart, setWishlist } from "../redux/feature/account/accountSlice";

const CartPage = () => {
    const cartData = useSelector(state => state.cart);
    const wishlist = useSelector(state => state.wishlist);
    const dispatch = useDispatch();
    console.log('cartData', cartData);
    const fetchCartData = async () => {
        const res = await fetchCart();
        if (res?.status === 200) {
            const data = await res.json();
            console.log(data);
            if (data?.cart) {
                dispatch(setCart(data));
            }
        }
    }
    const placeOrder = async () => {
        const res = await checkoutCart();
        if (res?.status === 200) {
            const data = await res.json();
            console.log(data);
            if (data?.cart_items.length > 0) {
                notification.success({ message: data?.message });
                fetchCartData();
            } else {
                notification.error({ message: data?.message });
            }
        }
    }

    const handleWishlist = async (key) => {
        const res = await updateWishlist(key);
        if (res?.status === 200) {
            const data = await res.json();
            dispatch(setWishlist(data?.product_keys));
        }
    }
    const onQtyChg = async (key, offset, type) => {
        console.log(offset, type);
        const data = await addCart(key, type === 'up' ? offset : -(offset));
        if (data) {
            console.log('data', data);
        }
        const newCartData = cartData?.cart.map((item) => {
            if (item.product_key === key) {
                return {
                    ...item,
                    qty: type === 'up' ? item.qty + offset : item.qty - offset,
                };
            }
            return item;
        });
        dispatch(setCart({ ...cartData, 'cart': newCartData }))
    }
    const checkoutHandler = () => {
        if (cartData?.cart.length > 0) {
            placeOrder();
        }
    }
    useEffect(() => {
        fetchCartData();
    }, []);
    return <div className="min-h-screen bg-gray-100">
        <div className="p-5 rounded-lg bg">
            <h1 className="w-full font-bold text-2xl text-black">Shopping Cart</h1>
            <div className="container mx-auto bg-white rounded-lg min-h-[500px] my-5 p-3">
                <Row>
                    <Col span={24} lg={17}>
                        <div className="rounded-md border border-gray-200 min-h-[500px] m-5 flex flex-col justify-between">
                            <div className="flex flex-col grow">
                                <Row className="hidden lg:flex">
                                    <Col span={24} lg={12} className="flex flex-row justify-between">
                                        <div className="p-2">
                                            <h1 className="text-gray-400 text-md font-bold pb-3">PRODUCT</h1>
                                        </div>
                                        <div className="p-2">
                                            <h1 className="text-gray-400 pb-3 text-md font-bold">QUANTITY</h1>
                                        </div>
                                    </Col>
                                    <Col span={24} lg={12} className="flex flex-row justify-between">
                                        <div className="p-2">
                                            <h1 className="text-gray-400 text-md font-bold pb-3">PRICE</h1>
                                        </div>
                                    </Col>
                                </Row>
                                {cartData?.cart?.length > 0 ? cartData?.cart?.map((item) => {

                                    return <>
                                        <Row>
                                            <Col span={24} lg={12} className="flex flex-row justify-between">
                                                <div className="p-2">
                                                    <div className="flex flex-row">
                                                        <Image src={item?.product?.image_path[0]} width={80} height={80} style={{ objectFit: 'cover' }} />
                                                        <div className="text-md text-gray-400 ps-2">
                                                            <h1 className="text-md text-black font-bold">{item?.product?.name}</h1>
                                                            <p className="text-sm">Tag: {item?.product?.tag}</p>
                                                            <p className="text-sm">Category: {item?.product?.category}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-2">
                                                    <div className="text-md text-black">
                                                        <InputNumber keyboard={false} min={1} max={10} defaultValue={item?.qty} onStep={(value, info) => onQtyChg(item?.product_key, info?.offset, info?.type)} />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col span={24} lg={12} className="flex flex-row justify-between">
                                                <div className="p-2">
                                                    <div className="flex flex-column items-end ">
                                                        <div className="text-md text-black font-bold">
                                                            <h1 className="text-md">${item?.tot_price}</h1>
                                                            <div className="text-sm text-gray-300">
                                                                ${item?.product?.price}/piece
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-2 flex flex-row items-center">
                                                    <Button className="text-gray-400" icon={wishlist.includes(item?.product_key) ? <HeartFilled /> : <HeartOutlined />} onClick={() => handleWishlist(item?.product_key)} />
                                                    <Button className="mx-2">Remove</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Divider />
                                    </>
                                }) : <div className="flex grow h-full justify-center items-center"><Empty /></div>}
                            </div>
                            <div className="sm:flex sm:flex-row justify-between">
                                <Button className="m-3 font-bold" onClick={() => window.location.href = '/'}>Continue Shopping</Button>
                                <Button className="m-3 hover:!text-orange-300 text-white bg-orange-500 flex items-center" onClick={checkoutHandler} disabled={cartData?.cart?.length <= 0}>Checkout <CreditCardFilled /></Button>
                            </div>
                        </div>
                    </Col>
                    <Col span={24} lg={7}>
                        <div>
                            <div className="rounded-md border border-gray-200  m-5">
                                <h1 className="px-2 text-black py-3 font-bold">Have a coupon?</h1>
                                <Space.Compact className="w-full px-5 pb-5">
                                    <Input placeholder="Coupon Code" />
                                    <Button type="primary bg-orange-400">Apply</Button>
                                </Space.Compact>
                            </div>
                            <div className="flex flex-col rounded-md border border-gray-200  m-5">
                                <div className="flex flex-row text-black font-bold justify-between px-5 pt-8 pb-1">
                                    <h1>Total Price</h1>
                                    <h1>${cartData?.total_price}</h1>

                                </div>
                                <div className="flex flex-row text-black font-bold justify-between px-5 py-1">
                                    <h1>Discount</h1>
                                    <h1>${cartData?.discount}</h1>
                                </div>
                                <div className="flex flex-row text-black font-bold justify-between px-5 py-1">
                                    <h1>Total</h1>
                                    <h1>${cartData?.net_amount}</h1>
                                </div>
                            </div>
                            <Divider className="my-1" />
                            <div className="flex flex-row justify-center">
                                <img src='/images/rupay.svg' width={50} height={50} className="mx-2" />
                                <img src='/images/discover.svg' width={50} height={50} className="mx-2" />
                                <img src='/images/visa.svg' width={50} height={50} className="mx-2" />
                            </div>
                        </div>
                    </Col>
                </Row>


            </div>
        </div>
    </div>
}
export default CartPage;