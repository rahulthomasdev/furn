'use client';
import { UserAddOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import '../../styles/login_main.css';
import '../../styles/login_util.css';
import { register } from '../helpers/ApiHelper';

const Register = () => {
    const router = useRouter();
    const [cred, setCred] = useState({ 'uname': '', 'email': '', 'password': '' });

    const regHandle = async (e) => {
        e.preventDefault();
        const data = await register(cred.uname, cred.email, cred.password);
        if (data?.user) {
            notification.success({ message: data?.message });
            router.push('/login')
        } else {
            notification.error({ message: data.message });
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
                            <i className=""><UserAddOutlined /></i>
                        </span>

                        <span className="login100-form-title p-b-34 p-t-27">
                            Register
                        </span>

                        <div className="wrap-input100 validate-input" data-validate="Enter Name">
                            <input className="input100" type="text" name="uname" placeholder="Name" onChange={handleChg} />
                            <span className="focus-input100" data-placeholder="&#xf207;"></span>

                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Enter email">
                            <input className="input100" type="text" name="email" placeholder="Email" onChange={handleChg} />
                            <span className="focus-input100" data-placeholder="&#xf207;"></span>

                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                            <input className="input100" type="password" name="password" placeholder="Password" onChange={handleChg} />
                            <span className="focus-input100" data-placeholder="&#xf191;"></span>
                        </div>


                        <div className="container-login100-form-btn">
                            <button type='submit' onClick={regHandle} className="transition-all duration-1000 ease-in-out bg-white rounded-full text-black py-3 px-10 hover:bg-green-500 hover:text-white font-semibold">
                                Register
                            </button>
                        </div>

                        <div className="text-center p-t-90">
                            <a className="txt1" href="/login">
                                Already have an account?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="dropDownSelect1"></div>
    </>
}
export default Register;
