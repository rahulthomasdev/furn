'use client'
import { fetchOrders } from "@/app/helpers/ApiHelper";
import { Button, Col, ConfigProvider, Divider, Image, Modal, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const Orders = () => {
    const [orders, setOrders] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState();
    const fetchOrderDetails = async () => {
        const res = await fetchOrders();
        if (res?.status === 200) {
            const data = await res.json();
            setOrders(data?.orders);
        }
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const handleViewOrder = (order) => {
        setIsModalOpen(true);
        setModalData(order);
    }
    useEffect(() => {
        fetchOrderDetails();
    }, []);

    return <>
        <ConfigProvider
            theme={{
                components: {

                },
            }}
        >
            <div className="flex-col container mx-auto">
                <h1 className="text-2xl font-bold">Orders</h1>

                {
                    orders?.map((order) => {
                        return <>
                            <div className="mt-3 py-5 px-5 border border-gray-300">
                                <Row className="flex w-full">
                                    <Col span={16} className="grid grid-cols-3  gap-4">
                                        {order?.order_items_details.map((item) => {
                                            return <Image width={100}
                                                src={item?.product?.image_path[0]} />
                                        })}

                                    </Col>
                                    <Col className="grow flex justify-end my-2 my-md-0">
                                        <Button className="rounded-none border-1 border-color-black text-black border-black font-bold" onClick={() => handleViewOrder(order)}>View Order</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="py-5 pe-10 flex-row inline-flex justify-around">
                                        <div className="flex-col">
                                            <h1 className="font-bold">Order number</h1>
                                            <p className="font-semibold">{order?.order_no}</p>
                                        </div>
                                        <Divider type="vertical" className="hidden md:block border border-gray-300 h-full" />
                                    </Col>
                                    <Col className="py-5 pe-10 flex-row inline-flex justify-around">
                                        <div className="flex-col">
                                            <h1 className="font-bold">Shipped date</h1>
                                            <p className="font-semibold">{order?.shipped_date ?? "NA"}</p>
                                        </div>
                                        <Divider type="vertical" className="hidden md:block border border-gray-300 h-full" />
                                    </Col>
                                    <Col className="py-5 pe-10 flex-row inline-flex justify-around">
                                        <div className="flex-col">
                                            <h1 className="font-bold">Total</h1>
                                            <p className="font-semibold">${order?.net_amount ?? "NA"}</p>
                                        </div>
                                        <Divider type="vertical" className="hidden md:block border border-gray-300 h-full" />
                                    </Col>
                                    <Col className="py-5 pe-10 flex-row inline-flex justify-around">
                                        <div className="flex-col">
                                            <h1 className="font-bold">Status</h1>
                                            {order?.status === 'Order Cancelled' ? <p className="font-semibold text-red-500">{order?.status}</p> : <p className="font-semibold text-green-500">{order?.status}</p>}
                                        </div>
                                    </Col>
                                </Row>
                            </div></>
                    })
                }
            </div>

            <Modal title="Order Details" open={isModalOpen} closeIcon={null} footer={
                <Button key="submit" type="primary" className="bg-orange-500" onClick={handleCancel}>
                    OK
                </Button>
            }>
                <p className="font-bold py-3">Order number: {modalData?.order_no}</p>
                <p>Total Price: <span className="line-through">${modalData?.total_price}</span></p>
                <p>Discount: ${modalData?.discount}</p>
                <p>Total Amount: ${modalData?.net_amount}</p>
                <p>Payment Mode: {modalData?.payment_mode ?? "NA"}</p>
                <p>status: <span className={modalData?.status === 'Order Cancelled' ? "text-red-500" : "text-green-500"}>{modalData?.status ?? "NA"}</span></p>
                <p className="font-bold py-3">Delivery Address:</p>
                <p>{`${modalData?.address?.address_line}, ${modalData?.address?.street}, ${modalData?.address?.city}, ${modalData?.address?.state}, ${modalData?.address?.postal_code}, ${modalData?.address?.country}`}</p>
                <p>Landmark: {modalData?.address?.landmark}</p>
                {/* <Image.PreviewGroup items={modalData?.order_items_details?.map((item) => ({ src: item?.product?.image_path[0] }))} /> */}

                {modalData?.order_items_details?.map((item) => (<Row className="w-full py-2"><Col span={8}><Image src={item?.product?.image_path[0]} width={60} /></Col><Col span={16} className="flex justify-between"><Link href={`/products/${item?.product?.prod_key}`}><span className="text-center w-full font-bold">{item?.product?.name}</span></Link><span className="text-center w-full">x{item?.quantity}</span></Col></Row>))}

            </Modal>
        </ConfigProvider>
    </>
}

export default Orders;