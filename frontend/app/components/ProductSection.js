
'use client'

import { CreditCardFilled, RocketFilled, SyncOutlined, WechatFilled } from "@ant-design/icons";
import { Col, ConfigProvider, Divider, Row, Tabs } from "antd";
import ProductList from "./ProductList";


const ProductSection = () => {
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: 'New Arrival',
            children: <ProductList viewAll={true} />,
        },
        {
            key: '2',
            label: 'Feaured',
            children: <ProductList viewAll={true} />,
        },
        {
            key: '3',
            label: 'On Sale',
            children: <ProductList viewAll={true} />,
        },
        {
            key: '4',
            label: 'Trending',
            children: <ProductList viewAll={true} />,
        },
    ];
    return <div>
        <ConfigProvider
            theme={{
                components: {
                    Tabs: {
                        inkBarColor: 'transparent', itemActiveColor: 'orange', itemSelectedColor: 'orange', itemHoverColor: '#fbbf24',
                    },
                },
            }}
        >

            <Row className='flex-col items-center justify-center text-black py-5'>
                <Col>
                    <div>
                        <h1 className="text-2xl font-bold">Our Products</h1>
                    </div>
                </Col>
                <Col>
                    <Row className="flex justify-center py-5">
                        <Col span={12}><p className="!text-gray-400">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p></Col>
                    </Row>
                </Col>
                <Col>
                    <Row className="my-8 flex !mx-0 justify-center" gutter={[16, 16]}>
                        <Col span={12} lg={6} className="flex flex-row justify-center leading-6">
                            <RocketFilled className="text-5xl !text-orange-400 rotate-45 px-5" />
                            <div>
                                <p className="font-bold text-md">Free Delivery</p>
                                <p>For all orders over $99</p>
                            </div>
                            <Divider type="vertical" className="h-full hidden lg:visible" />
                        </Col>
                        <Col span={12} lg={6} className="flex flex-row justify-center leading-6">
                            <SyncOutlined className="text-5xl !text-orange-400 rotate-45 px-5" />
                            <div>
                                <p className="font-bold text-md">10 Days Return</p>
                                <p>For verified issues</p>
                            </div>
                            <Divider type="vertical" className="h-full hidden lg:visible" />
                        </Col>
                        <Col span={12} lg={6} className="flex flex-row justify-center leading-6">
                            <CreditCardFilled className="text-5xl !text-orange-400 px-5" />
                            <div>
                                <p className="font-bold text-md">Secure Payment</p>
                                <p>99.99% secure payment</p>
                            </div>
                            <Divider type="vertical" className="h-full hidden lg:visible" />
                        </Col>
                        <Col span={12} lg={6} className="flex flex-row justify-center leading-6">
                            <WechatFilled className="text-5xl !text-orange-400 px-5" />
                            <div>
                                <p className="font-bold text-md">12/7 Support</p>
                                <p>Dedicated support</p>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Tabs className='__product_tab_links' defaultActiveKey="1" items={items} onChange={onChange} centered={true} />
                </Col>
            </Row>
        </ConfigProvider >
    </div >
}
export default ProductSection;