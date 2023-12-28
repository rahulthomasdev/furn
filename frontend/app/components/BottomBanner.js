'use client'

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Carousel, ConfigProvider } from "antd";
import { useEffect, useRef, useState } from "react";
import { fetchFeedbacks } from "../helpers/ApiHelper";
import CustomerCard from "./CustomerCard";


const BottomBanner = () => {
    const [feedbackData, setFeedbackData] = useState();
    const carRef = useRef();
    const nextHandle = () => {
        carRef.current.next();
    }
    const prevHandle = () => {
        carRef.current.prev();
    }

    const fetchFeedbackData = async () => {
        const res = await fetchFeedbacks();
        if (res?.status === 200) {
            const data = await res?.json();
            setFeedbackData(data?.feedbacks);
        }
    }

    useEffect(() => {
        fetchFeedbackData();
    }, [])

    const cards = feedbackData?.map((fb, index) => (
        <CustomerCard className='h-full' key={index} feedback={fb} />
    ));
    return <div className="flex items-center justify-center  my-5 py-5 min-h-[600px]" style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2018/07/11/06/03/interior-3530343_1280.jpg')` }}>
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        textHoverBg: 'white',
                        colorPrimaryBorder: 'white',
                        colorPrimaryHover: 'white'
                    },
                },
            }}
        >
            <div className="w-full">
                <div className="container mx-auto">
                    <div className="flex-row inline-flex justify-between items-center px-10  w-full">
                        <h3 className="pb-5 text-xl text-black font-bold text-center">WHAT CUSTOMER SAY</h3>
                        <div><Button className="border-none text-2xl text-gray-400" icon={<LeftOutlined className="!text-2xl" />} onClick={prevHandle} /><Button className="border-none text-2xl text-gray-400" icon={<RightOutlined className="!text-2xl" onClick={nextHandle} />} /></div>
                    </div>
                </div>
                <div className="container mx-auto">
                    <Carousel ref={carRef} afterChange={() => { }} autoplay={false} dots={false} responsive={[
                        {
                            breakpoint: 2000,
                            settings: {
                                slidesToShow: feedbackData?.length >= 4 ? 4 : feedbackData?.length,
                                slidesToScroll: 4,
                            }
                        }, {
                            breakpoint: 1600,
                            settings: {
                                slidesToShow: feedbackData?.length >= 3 ? 3 : feedbackData?.length,
                                slidesToScroll: 3,
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: feedbackData?.length >= 2 ? 2 : feedbackData?.length,
                                slidesToScroll: 2,
                            }
                        },
                        {
                            breakpoint: 678,
                            settings: {
                                slidesToShow: feedbackData?.length >= 1 ? 1 : feedbackData?.length,
                                slidesToScroll: 1,
                            }
                        },
                    ]}>
                        {cards}
                    </Carousel>
                </div>
            </div>
        </ConfigProvider>
    </div>
}
export default BottomBanner;