'use client'

import { HeartOutlined, HomeOutlined, LogoutOutlined, MenuFoldOutlined, OrderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, List, Row } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";


const AccountLayout = ({ children }) => {
    const profile = useSelector(state => state.profile);
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    };

    const MenuList = () => {
        return <>
            <List>
                <List.Item className={pathname === '/account/profile' ? 'bg-gray-100 rounded-lg mx-3 my-3' : '' + "hover:bg-gray-300 rounded-lg mx-3 my-3 transition"}><Link href='/account/profile' className="text-black flex justify-start items-center w-full">
                    <UserOutlined className="px-2" /> <h1 className="font-semibold ">Profile</h1>
                </Link></List.Item>
                <List.Item className={pathname === '/account/orders' ? 'bg-gray-100 rounded-lg mx-3 my-3' : '' + "hover:bg-gray-300 rounded-lg mx-3  my-3 transition"}><Link href='/account/orders' className="text-black flex justify-start items-center w-full">
                    <OrderedListOutlined className="px-2" /> <h1 className="font-semibold ">Orders</h1>
                </Link></List.Item>
                <List.Item className={pathname === '/account/wishlist' ? 'bg-gray-100 rounded-lg mx-3 my-3' : '' + "hover:bg-gray-300 rounded-lg mx-3  my-3 transition"}><Link href='/account/wishlist' className="text-black flex justify-start items-center w-full">
                    <HeartOutlined className="px-2" /> <h1 className="font-semibold ">Wishlist</h1>
                </Link></List.Item>
                <List.Item className="hover:bg-gray-300 rounded-lg mx-3  my-3 transition"><span className="text-black flex justify-start items-center w-full">
                    <Link href='/account/address' className="text-black flex justify-start items-center w-full"> <HomeOutlined className="px-2" /> <h1 className="font-semibold ">Addresses</h1></Link>
                </span></List.Item>
                <List.Item className="hover:bg-gray-300 rounded-lg mx-3  my-3 transition"><span className="text-black flex justify-start items-center w-full">
                    <LogoutOutlined className="px-2" /> <h1 className="font-semibold ">Sign out</h1>
                </span></List.Item>
            </List>
        </>
    };

    const router = useRouter();
    const pathname = usePathname();
    return <div className="bg-gray-50 min-h-screen">
        <h1 className="text-2xl text-black font-bold pt-5 pl-5">My Account</h1>
        <Row className="w-full relative">
            <Col lg={6} className=" h-auto w-full text-black pt-5 ps-5 pe-5 pe-lg-0">
                <div className=" !bg-white py-5 px-2 rounded mb-4 container mx-auto">
                    <h1 className="text-black mx-3 font-bold">Welcome, {profile?.name}</h1>
                    <div className='!hidden lg:!block' >
                        <MenuList />
                    </div>
                </div>
            </Col>
            <Col lg={18} className="w-full text-black py-5 px-5">
                {children}
            </Col>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <MenuList />
            </Drawer>
            <Button icon={<MenuFoldOutlined />} className="absolute translate-y-[-25px] top-0 right-[10px] lg:hidden hover:!text-orange-400 hover:!border-orange-400" onClick={showDrawer} />
        </Row>
    </div >
}
export default AccountLayout;