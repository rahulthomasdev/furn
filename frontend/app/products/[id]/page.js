'use client'
import RelatedProducts from "@/app/components/RelatedProducts";
import { fetchProductDetails } from "@/app/helpers/ApiHelper";
import { HeartOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const { Col, Row, Image, Divider, InputNumber, ConfigProvider, Button, Rate, Tabs, Carousel } = require("antd")


const ProductPage = () => {
    const pKey = useParams().id;
    const [data, setData] = useState(null);
    const fetchData = async (pKey) => {
        const data = await fetchProductDetails(pKey);
        setData(data);
    }
    useEffect(() => {
        fetchData(pKey);
    }, []);
    const items = [
        {
            key: '1',
            label: 'Specification',
            children: <Paragraph ellipsis={{
                rows: 3,
                expandable: true,
            }}>{data?.product.specification}</Paragraph>,
        },
        {
            key: '2',
            label: 'Info',
            children: <Paragraph ellipsis={{
                rows: 3,
                expandable: true,
            }}>{data?.product.info}</Paragraph>,
        },
        {
            key: '3',
            label: `Reviews (${(data?.product.reviews ?? []).length})`,
            children: <Paragraph ellipsis={{
                rows: 3,
                expandable: true,
            }}>{data?.product.reviews ?? 'NA'}</Paragraph>,
        },
    ];
    return <div className="!min-h-screen bg-white">
        <ConfigProvider
            theme={{
                components: {
                    InputNumber: {
                        activeBorderColor: 'orange',
                        activeShadow: 'rgba(255, 165, 0, 0.1)',
                        handleHoverColor: 'orange',
                        hoverBorderColor: 'orange'
                    },
                    Tabs: {
                        titleFontSize: 21,
                        inkBarColor: 'gray',
                        itemActiveColor: 'orange',
                        itemSelectedColor: 'orange',
                        itemHoverColor: '#fdba74',
                        cardHeight: '250'
                    }
                },
            }}
        >
            <Row className="container mx-auto pt-20 py-5 px-5 ">
                <Col lg={14}>
                    <div className="grid grid-cols-3 gap-8 h-full">
                        <div className="grid grid-row-3  gap-8">
                            <div className="bg-gray-200 h-[200px]  object-cover"><Image height={'100%'} width={'100%'} style={{ objectFit: 'cover' }}
                                src={data?.product.image_path[0]}
                            /></div>
                            {data?.product.image_path[1] && <div className="bg-gray-200 h-[200px] "><Image height={'100%'} width={'100%'} style={{ objectFit: 'cover' }}
                                src={data?.product.image_path[1]}
                            /></div>}
                            {data?.product.image_path[2] && <div className="bg-gray-200 h-[200px] "><Image height={'100%'} width={'100%'} style={{ objectFit: 'cover' }}
                                src={data?.product.image_path[2]}
                            /></div>}
                        </div>
                        <div className="col-span-2 bg-gray-200 h-full">
                            <div className="bg-gray-200 h-full "><Image height={'100%'} width={'100%'} style={{ objectFit: 'cover' }}
                                src={data?.product.image_path[0]}
                            /></div>

                        </div>
                    </div>
                </Col>
                <Col lg={10}>
                    <div className="h-full lg:mx-5">
                        <div className="pt-5 lg:pt-0">
                            <h1 className="text-black font-bold text-3xl leading-10">{data?.product.name}</h1>
                            <h2 className="text-black font-bold text-2xl leading-10">{data?.product.price}</h2>
                            <Rate allowHalf onChange={{}} value={4.5} /> <span className="text-black text-lg font-bold">4.5/5</span>
                            <Divider ></Divider>
                            <p className="text-black text-md">{data?.product.description}</p>
                            <InputNumber className="my-5 text-2xl font-bold" min={1} max={10} defaultValue={3} />
                            <button className="mx-5 rounded-none text-xl border-2 font-bold text-slate-700 border-black text-black px-3 py-2">Add to cart</button>
                            <h3 className="text-black text-md font-semibold">Add to wishlist <button>
                                <HeartOutlined className="px-3" />
                            </button></h3>
                            <div className="text-black leading-10 py-5">
                                <h1>SKU: 369</h1>
                                <h1>CATEGORY: FURNITURE</h1>
                                <h1>TAG: Furninshing</h1>
                            </div>
                        </div>

                    </div>
                </Col>
            </Row>
            <div className="container mx-auto min-h-[250px] transition-all">
                <Row className="text-black py-5 px-5">
                    <Tabs defaultActiveKey="1" items={items} />
                </Row>
            </div>
            <div className="container mx-auto">
                <Row className="text-black py-5 pt-10 px-5">
                    <h1 className="text-black font-bold text-2xl">Related products</h1>
                </Row>
                {data?.related_products ? <RelatedProducts data={data?.related_products} /> : ''}
            </div>
        </ConfigProvider>
    </div>
}
export default ProductPage;