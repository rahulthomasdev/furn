'use client';
import { LoginOutlined } from '@ant-design/icons';
import { Divider, notification } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../../styles/login_main.css';
import '../../styles/login_util.css';
import { login } from '../helpers/ApiHelper';
import { setGuest, setProfile } from '../redux/feature/account/accountSlice';

const Login = () => {

    const dispatch = useDispatch();

    const router = useRouter();
    const [cred, setCred] = useState({ 'email': '', 'password': '' });

    const loginHandle = async (e) => {
        e.preventDefault();
        const res = await login(cred.email, cred.password);
        const data = await res.json();
        if (res?.status === 200) {
            Cookies.set("token", data?.token);
            notification.success({ message: 'Login success' });
            dispatch(setGuest(false));
            dispatch(setProfile(data?.profile ?? null));
            router.push('/');
        } else {
            console.log(data);
            notification.error({ message: data?.message });
        }
    }

    const handleChg = (e) => {
        const { name, value } = e.target;
        if (name && value) {
            setCred((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    }
    return <>
        <link rel="stylesheet" type="text/css" href="fonts/css/material-design-iconic-font.min.css"></link>
        <div className="limiter">
            <div className="container-login100" style={{ backgroundImage: "url('images/bg.webp')" }}>
                <div className="wrap-login100">
                    <form className="login100-form validate-form">
                        <span className="login100-form-logo">
                            <i className=""><LoginOutlined /></i>
                        </span>

                        <span className="login100-form-title p-b-34 p-t-27">
                            Log in
                        </span>

                        <div className="wrap-input100 validate-input" data-validate="Enter email">
                            <input className="input100" type="text" name="email" placeholder="Email" onChange={handleChg} />
                            <span className="focus-input100" data-placeholder="&#xf207;"></span>

                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                            <input className="input100" type="password" name="password" placeholder="Password" onChange={handleChg} />
                            <span className="focus-input100" data-placeholder="&#xf191;"></span>
                        </div>

                        <div className="contact100-form-checkbox">
                            <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                            <label className="label-checkbox100" for="ckb1">
                                Remember me
                            </label>
                        </div>

                        <div className="container-login100-form-btn">
                            <button type='submit' onClick={loginHandle} className="transition-all duration-1000 ease-in-out bg-white rounded-full text-black py-3 px-10 hover:bg-green-500 hover:text-white font-semibold">
                                Login
                            </button>
                        </div>

                        <div className="text-center p-t-90">
                            <a className="txt1 !text-lg" href="#">
                                Forgot Password?
                            </a>
                            <Divider type='vertical' style={{ border: "1px solid gray" }} />
                            <a className="txt1 !text-lg" href="/register">
                                Register now.
                            </a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        <div id="dropDownSelect1"></div>
    </>
}
export default Login;
