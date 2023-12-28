'use client'
import { HeartOutlined, SearchOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { AutoComplete, Badge, Col, Divider, Input, Layout, Popover, Row, notification } from 'antd';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, fetchWish, searchProducts, signOut } from '../helpers/ApiHelper';
import { clearCart, clearProfile, clearWishlist, setCart, setGuest, setWishlist } from '../redux/feature/account/accountSlice';
const { Header } = Layout;
const Navbar = () => {
    const isGuest = useSelector(state => state.isGuest);
    const profile = useSelector(state => state.profile);
    const cart = useSelector(state => state.cart);
    const wishlist = useSelector(state => state.wishlist);
    const router = useRouter();

    const dispatch = useDispatch()

    const fetchCartData = async () => {
        const res = await fetchCart();
        if (res?.status === 200) {
            const data = await res.json();
            if (data?.cart) {
                dispatch(setCart(data));
            }
        }
    }
    const fetchWishlist = async () => {
        const res = await fetchWish();
        if (res?.status === 200) {
            const data = await res.json();
            if (data?.product_keys) {
                dispatch(setWishlist(data?.product_keys));
            }
        }
    }
    const checkToken = async () => {
        if (!Cookies.get('token')) {
            console.log('no token');
            dispatch(clearProfile());
            dispatch(clearCart());
            dispatch(clearWishlist());
            dispatch(setGuest(true));
        }
    }
    useEffect(() => {
        fetchCartData();
        fetchWishlist();
        checkToken();
    }, []);

    const handleSignout = async () => {
        const res = await signOut();
        if (res?.status === 200) {
            const data = await res.json();
            console.log(data);
            notification.success({ message: data?.message });
            dispatch(clearProfile());
            dispatch(clearCart());
            dispatch(clearWishlist());
            dispatch(setGuest(true));
        } else {
            notification.error({ message: res?.statusText ?? 'Something went wrong' });
        }
    }



    const SearchBar = () => {
        const [options, setOptions] = useState([]);

        const handleSearch = async (value) => {
            setOptions(value ? await searchResult(value) : []);
            console.log(await searchResult(value));
        };
        const onSelect = (value) => {
            router.push(`/products/${value}`);
        };



        const searchResult = async (value) => {
            const res = await searchProducts(value);
            if (res?.status === 200) {
                const data = await res.json();
                const items = data?.products?.map((item) => {

                    return renderItem(item?.name, item?.prod_key)

                });
                return items;
            }
        }


        const renderItem = (name, key) => ({
            value: key,
            label: (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    {name}
                </div>
            ),
        });

        return <>
            <AutoComplete className='translate-y-[-5px]'
                popupMatchSelectWidth={252}
                style={{ width: 300 }}
                options={options}
                onSelect={onSelect}
                onSearch={handleSearch}
            >
                <Input.Search size="normal" placeholder="Search" className='__searchBtn' />
            </AutoComplete>
        </>
    }

    let content;
    if (isGuest) {
        content = <div className='flex flex-col  text-black font-semibold px-3 grid-row-2 gap-2'>
            <p>Guest</p>
            <Link href='/login' className='hover:!text-orange-400'>Login</Link>
        </div>
    } else {
        content = <div className='flex flex-col text-black px-3 grid-row-3 gap-2 font-semibold'>
            <p>Hello, {profile ? profile.name : 'Guest'}</p>
            <Link href='/account/profile' className='hover:!text-orange-400'>My Profile</Link>
            <Link href='#' onClick={handleSignout} className='hover:!text-orange-400'>Sign Out</Link>
        </div>
    }
    return <Header className='text-black bg-white'>
        <Row className='md:container mx-auto flex justify-between items-center'>
            <Col className='aspect-w-16 aspect-h-9'>
                <Link href='/'><img src="/furns.png" className='object-contain h-5 md:h-8 lg:h-10' /></Link>
            </Col>
            <Col >
                <Popover content={<SearchBar />} className='border-none shadow-none block md:!hidden'>
                    <SearchOutlined className='md:text-lg px-1 lg:px-3' />
                </Popover>
                <span className='hidden md:inline-flex'>
                    <SearchBar />
                </span>
                <Divider type="vertical" />
                <Popover placement='bottom' content={content}>
                    <UserOutlined className='md:text-lg  px-1 lg:px-3' />
                </Popover>
                <Divider type="vertical" />
                <Badge count={Array.isArray(cart?.cart) ? cart?.cart?.length : 0} color='orange' size='default'>
                    <Link href='/cart'>
                        <ShoppingOutlined className='md:text-lg  px-1 lg:px-3' />
                    </Link>
                </Badge>
                <Divider type="vertical" />
                {console.log(wishlist)}
                <Badge count={Array.isArray(wishlist) ? wishlist?.length : 0} color='orange' size='default'>
                    <Link href='/account/wishlist'>
                        <HeartOutlined className='md:text-lg  px-1 lg:px-3' />
                    </Link>
                </Badge>
            </Col>
        </Row>
    </Header>
}

export default Navbar;