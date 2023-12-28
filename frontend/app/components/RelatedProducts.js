'use client'
import { Carousel } from "antd";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";


const RelatedProducts = (props) => {
    const [data, setData] = useState(null);
    const [mount, setMount] = useState(false);
    // const fetchData = async () => {
    //     const data = await fetchProductsAll();
    //     if (data) {
    //         setData(data);
    //     }
    // }
    useEffect(() => {
        // fetchData();
        if (!mount) {
            setMount(true);
            setData(props?.data);
        }
    }, [])
    return <div className="h-full">
        {data ? <Carousel slidesToScroll={1} dots={false} className="w-full py-5" responsive={[
            {
                breakpoint: 2200,
                settings: {
                    slidesToShow: data?.length > 4 ? 4 : data?.length,
                }
            }, {
                breakpoint: 1600,
                settings: {
                    slidesToShow: data?.length > 3 ? 3 : data?.length,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: data?.length > 2 ? 2 : data?.length,
                }
            },
            {
                breakpoint: 678,
                settings: {
                    slidesToShow: data?.length > 1 ? 1 : data?.length,
                }
            },
        ]}>
            {data?.map((item, index) => {
                return <div key={item.id} className="p-3 h-full">
                    <ProductCard key={item.id} data={item} />
                </div>
            })}
        </Carousel> : ''}
    </div>
}
export default RelatedProducts;