import { CheckCircleFilled, UserOutlined } from "@ant-design/icons";

const { Card, Avatar, Rate } = require("antd")

const CustomerCard = (props) => {
    return <div className="h-full">
        <Card className="h-full border-none pt-10 mx-5 shadow-lg">
            <div className="mx-5">
                <div className="absolute top-0 -translate-y-1/2 pt-20"><Avatar size={64} icon={<UserOutlined />} /></div>
                <div className="py-3 flex flex-row justify-end w-full"><Rate disabled defaultValue={props?.feedback?.rate} /></div>
                <h1 className="text-black font-bold">{props?.feedback?.name}</h1> <h1>{props?.feedback?.verified_user !== null ? <span>
                    <CheckCircleFilled className="!text-blue-400" /> 'Verified Customer'
                </span> : ""}</h1>
                <p className="leading-8 !truncat">{props?.feedback?.feedback}</p>
            </div>
        </Card>
    </div>
}
export default CustomerCard;