'use client'
import { updateProfile } from "@/app/helpers/ApiHelper";
import { setProfile } from "@/app/redux/feature/account/accountSlice";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, DatePicker, Form, Input, notification } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile)
    const dobDate = profile?.dob ? moment(profile.dob, 'YYYY-MM-DD') : null;

    const handleSubmit = async (values) => {
        const { uname, email, phone, dob } = values;
        const res = await updateProfile(uname, email, phone, dob);
        const data = await res.json();
        if (res.status === 200) {
            dispatch(setProfile(data?.profile ?? null));
            notification.success({ message: data?.message });
        } else {
            notification.error({ message: data?.error?.email ?? 'Something went wrong' });
        }
    }
    return <>
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        activeBorderColor: 'orange',
                        hoverBorderColor: 'orange',
                        activeShadow: ' box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.1)'
                    },
                    DatePicker: {
                        activeBorderColor: 'orange',
                        hoverBorderColor: 'orange',
                        activeShadow: ' box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.1)'
                    }
                },
            }}
        >

            <Form className="py-5 container mx-auto bg-white rounded-xl px-5"
                onFinish={handleSubmit}
            >
                <div className="flex justify-center w-full bg-gray-200 rounded py-2 py-lg-5">

                    <Avatar
                        id="avatar"
                        size={{ xs: 50, sm: 60, md: 70, lg: 84, xl: 90, xxl: 100 }}
                        icon={<UserOutlined />}
                        // src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                        className="mt-2"
                    />
                </div>
                <label htmlFor="fullName" className="block font-medium text-gray-700 mt-3">
                    Full Name
                </label>
                <Form.Item name="uname">
                    <Input id="fullName" className="font-semibold mt-1 text-lg text-slate-700" placeholder={profile?.name} defaultValue={profile?.name} />
                </Form.Item>


                <label htmlFor="email" className="block font-medium text-gray-700 mt-3">
                    Email Address
                </label>
                <Form.Item name="email">
                    <Input id="email" className="font-semibold my-1 text-lg text-slate-700" placeholder={profile?.email} disabled={true} defaultValue={profile?.email} />
                </Form.Item>
                <label htmlFor="phone" className="block font-medium text-gray-700 mt-3">
                    Phone Number
                </label>
                <Form.Item name="phone">
                    <Input id="phone" className="font-semibold my-1 text-lg text-slate-700" placeholder={profile?.phone} defaultValue={profile?.phone} />
                </Form.Item>
                <label htmlFor="dob" className="block font-medium text-gray-700 mt-3">
                    Date of Birth
                </label>
                <Form.Item name="dob">
                    <DatePicker id="dob" className="font-semibold my-1 text-lg text-slate-700" placeholder={profile?.dob} defaultValue={dobDate} />
                </Form.Item>
                <div className="flex justify-end">   <Form.Item><Button color="orange" className="px-5 my-3 bg-orange-400 text-white font-bold hover:!text-white hover:!bg-orange-300 border-0" htmlType="submit">Update</Button>   </Form.Item></div>
            </Form>

        </ConfigProvider>
    </>
}

export default Profile;