'use client'
import { submitFeedback } from "@/app/helpers/ApiHelper";
import { Button, Card, Form, Input, Rate, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";


const FeedBackPage = () => {
    const profile = useSelector(state => state.profile);
    const onFinishHandler = (values) => {
        values.rate = values.rate.toFixed(1);
        values.verified_user = profile?.id ?? null;
        console.log(values);
        feedbackHandler(values)
    }
    const feedbackHandler = async (formData) => {
        const res = await submitFeedback(formData);
        const data = await res.json();
        if (res.status === 200) {
            notification.success({ message: data?.message })
        } else {
            notification.error({ message: data?.message })
        }
    }
    return <div className="flex items-center justify-center h-screen bg-white">
        <Card className="shadow-lg">
            <Form wrapperCol={{ span: 24 }} labelCol={{ span: 24 }} onFinish={onFinishHandler} initialValues={{
                uname: profile?.name, email: profile?.email
            }}>
                <Form.Item label="Name" name="uname" rules={[{ required: true }]}>
                    <Input placeholder="Name" defaultValue={profile?.name} disabled={profile?.name} />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                    <Input placeholder="Email" defaultValue={profile?.email} disabled={profile?.email} />
                </Form.Item>
                <Form.Item label="Feedback" name="feedback" rules={[{ required: true, min: 50 }]}>
                    <TextArea placeholder="Feedback" />
                </Form.Item>
                <Form.Item label="Rate" name="rate" rules={[{ required: true }]}>
                    <Rate allowHalf defaultValue={2.5} />
                </Form.Item>
                <Button className="w-full bg-orange-400 !text-white hover:bg-orange-300" htmlType="submit">Send Feedback</Button>
            </Form>
        </Card>
    </div >
}
export default FeedBackPage;