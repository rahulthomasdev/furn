"use client";
import { FacebookFilled, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import { Button, Col, ConfigProvider, Input, Layout, Row, Space } from "antd";

const { Footer } = Layout;
const FooterComponent = () => {
    const footerStyle = {
        backgroundColor: "#f3f4f6",
        color: "gray",
        textAlign: "center",
        padding: "20px 0",
    };
    return (
        <Footer style={footerStyle}>
            <div className="container mx-auto">
                <Row gutter={16} className="ps-3 md:ps-0 !mx-0">
                    <Col lg={5}>
                        <aside className="widget widget_footer ">
                            <h4 className="widget-title font-bold text-lg leading-2 text-left">Quick links</h4>
                            <ul className="ps-list--link py-4 !leading-8 text-left">
                                <li>
                                    <a href="/page/blank">Policy</a>
                                </li>
                                <li>
                                    <a href="/page/blank">Term &amp; Condition</a>
                                </li>
                                <li>
                                    <a href="/page/blank">Shipping</a>
                                </li>
                                <li>
                                    <a href="/page/blank">Return</a>
                                </li>
                                <li>
                                    <a href="/page/faqs">FAQs</a>
                                </li>
                            </ul>
                        </aside>
                    </Col>
                    <Col lg={5}>
                        <aside className="widget widget_footer ">
                            <h4 className="widget-title font-bold text-lg leading-2 text-left">Company</h4>
                            <ul className="ps-list--link py-4 !leading-8 text-left">
                                <li>
                                    <a href="/page/blank">About Us</a>
                                </li>
                                <li>
                                    <a href="/page/blank">Affilate</a>
                                </li>
                                <li>
                                    <a href="/page/blank">Career</a>
                                </li>
                                <li>
                                    <a href="/page/blank">Contact</a>
                                </li>
                                <li>
                                    <a href="/page/feedback">Feedback</a>
                                </li>
                            </ul>
                        </aside>
                    </Col>
                    <Col lg={5}>
                        <aside className="widget widget_footer ">
                            <h4 className="widget-title font-bold text-lg leading-2 text-left">Bussiness</h4>
                            <ul className="ps-list--link py-4 !leading-8 text-left">
                                <li>
                                    <a href="/page/blank">Our Press</a>
                                </li>
                                <li>
                                    <a href="/page/blank">Checkout</a>
                                </li>
                                <li>
                                    <a href="/page/blank">My account</a>
                                </li>
                                <li>
                                    <a href="/page/blank">Shop</a>
                                </li>
                            </ul>
                        </aside>
                    </Col>
                    <Col lg={9}>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Input: {
                                        activeBorderColor: 'orange',
                                        hoverBorderColor: 'orange'
                                    },
                                },
                            }}
                        >
                            <aside className="widget widget_footer ">
                                <h4 className="widget-title font-bold text-lg leading-2 text-left">Newsletter</h4>
                                <Space.Compact
                                    style={{
                                        width: '100%',
                                    }}
                                    className="__sub pt-5" size="large"
                                >
                                    <Input placeholder="Email" />
                                    <Button type="primary hover:!bg-orange-300">Submit</Button>
                                </Space.Compact>
                            </aside>
                        </ConfigProvider>
                        <div className="flex items-start justify-start py-5 gap-5 text-xl">
                            <a href="#">
                                <FacebookFilled className="!text-blue-600" href="#" />
                            </a>
                            <a href="#" >
                                <TwitterOutlined className="!text-blue-400" />
                            </a>
                            <a href="#">
                                <InstagramOutlined className="!text-pink-600 pointer-events-auto" />
                            </a>
                        </div>
                        <div className="flex flex-row justify-start">
                            <img src='/images/rupay.svg' width={50} height={50} className="mx-2" />
                            <img src='/images/discover.svg' width={50} height={50} className="mx-2" />
                            <img src='/images/visa.svg' width={50} height={50} className="mx-2" />
                        </div>
                    </Col>
                </Row>
            </div>
        </Footer>
    );
};
export default FooterComponent;
