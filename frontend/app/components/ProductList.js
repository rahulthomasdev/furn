import { Button, Spin } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchProducts } from "../helpers/ApiHelper";
import ProductCard from "./ProductCard";

const ProductList = (props) => {
    const [products, setProducts] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const fetchProductsData = async (pNo) => {
        const ret = await fetchProducts(pNo);
        if (ret) {
            setIsLoading(false);
        }
        setProducts(preProducts => preProducts ? [...preProducts, ...ret?.products] : ret?.products);
        if (ret?.current_page < ret?.total_page && !props.viewAll) {
            setHasMore(true);
            setIsLoading(false);
        }

    };
    useEffect(() => {
        fetchProductsData(pageNumber);
    }, []);

    const fetchMoreData = () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const updatedPno = pageNumber + 1;
        setPageNumber(updatedPno);
        fetchProductsData(updatedPno);
    }
    return (<>
        {isLoading ? <Spin size="large" className="flex items-center justify-center w-full min-h-[500px]" /> : <div>
            {products ? <InfiniteScroll
                dataLength={products?.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<p>Loding...</p>}
            >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 container mx-auto pb-5">
                    {products?.map((element, index) => (
                        <div key={index} className="px-4">
                            <ProductCard data={element} />
                        </div>
                    ))}
                </div>            </InfiniteScroll> : null}
            {props.viewAll ? <div className="flex justify-center w-full py-5">
                <Link href={'/products'}>
                    <Button className="bg-orange-400 text-white border-none hover:!text-white hover:!bg-orange-300">
                        View All
                    </Button>
                </Link>
            </div> : ''}
        </div>
        }

    </>

    );
};

export default ProductList;
