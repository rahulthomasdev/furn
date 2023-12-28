import { Spin } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { fetchWishlisDetails } from "../helpers/ApiHelper";
import ProductCard from "./ProductCard";

const ProductListScrollable = () => {
    const [products, setProducts] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false)
    const wishlist = useSelector(state => state.wishlist);
    const fetchProductsData = async (pNo) => {
        const ret = await fetchWishlisDetails(pNo);
        if (ret) {
            setIsLoading(false);
        }
        setProducts(preProducts => preProducts ? [...preProducts, ...ret?.products] : ret?.products);
        if (ret?.current_page < ret?.total_page) {
            setHasMore(true);
            setIsLoading(false);
        }

    };
    const refreshProductsData = async (pNo) => {
        const ret = await fetchWishlisDetails(pNo);
        if (ret) {
            setIsLoading(false);
        }
        setProducts(ret?.products);
        if (ret?.current_page < ret?.total_page) {
            setHasMore(true);
            setIsLoading(false);
        }

    };
    useEffect(() => {
        fetchProductsData(pageNumber);
    }, []);
    useEffect(() => {
        refreshProductsData(pageNumber);
    }, [wishlist]);

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
        {isLoading ? <Spin size="large" className="!flex items-center justify-center w-full min-h-[500px]" /> : <div>
            {products ? <InfiniteScroll
                dataLength={products?.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<p>Loding...</p>}
            >
                <TransitionGroup component="ProductCard" className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 container mx-auto pb-5 transition transition-transform">
                    {products?.map((element, index) => (
                        <CSSTransition key={element?.prod_key} timeout={700} classNames="item">
                            <div key={element?.prod_key} className="px-4">
                                <ProductCard data={element} key={element?.prod_key} />
                            </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </InfiniteScroll> : null}
        </div>
        }

    </>

    );
};

export default ProductListScrollable;
