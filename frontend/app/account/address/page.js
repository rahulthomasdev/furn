'use client'
import { addAddress, addressUpdate, deleteAddress, fetchAddressList } from "@/app/helpers/ApiHelper";
import { setAddresses } from "@/app/redux/feature/account/accountSlice";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification } from "antd";
import Card from "antd/es/card/Card";
import Checkbox from "antd/es/checkbox/Checkbox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const AddressPage = () => {
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [openUpdateAddressModal, setOpenUpdateAddressModal] = useState(false);
    const [addressToUpdate, setAddressToUpdate] = useState([]);
    const dispatch = useDispatch();

    const addresess = useSelector(state => state.addresses);
    console.log('Addresses', addresess);
    const fetchAddresses = async () => {
        const data = await fetchAddressList();
        if (data?.addresses) {
            dispatch(setAddresses(data?.addresses));
        }
    }

    useEffect(() => {
        fetchAddresses();
    }, []);

    const onCancel = () => {
        setOpenAddressModal(prev => !prev);
    }
    const onCancelUpdate = () => {
        setOpenUpdateAddressModal(false);
    }
    const handleAdd = () => {
        setOpenAddressModal(true);
    }
    const handleUpdate = (address) => {
        setOpenUpdateAddressModal(true);
        setAddressToUpdate(address);
    }
    const deleteAddressHandle = async (addressID) => {
        const res = await deleteAddress(addressID);
        const data = await res.json();
        if (res.status === 200) {
            notification.success({ message: data?.message });
            const updatedAddresses = addresess.filter((address) => (address?.id !== addressID));
            dispatch(setAddresses(updatedAddresses));
        } else {
            notification.error({ message: data?.message ?? 'Something went wrong!' });
        }
    }

    const AddressModal = () => {
        const [form] = Form.useForm();

        const addNewAddress = async (values) => {
            const res = await addAddress(values?.isPrimary ? 10 : 20, values?.addressName, values?.addressLine, values?.street, values?.city, values?.state, values?.postalCode, values?.country, values?.landmark);
            const data = await res.json();
            var updatedAddresses = addresess;
            if (res.status === 200) {
                notification.info({ message: data?.message });
                if (values?.isPrimary) {
                    updatedAddresses = updatedAddresses.map((address) => {
                        if (address['primary'] === 10) {
                            return { ...address, ['primary']: 20 };
                        }
                        return address;
                    })
                }
                updatedAddresses = [...updatedAddresses, ...[data?.address]];

                dispatch(setAddresses(updatedAddresses));
            } else {
                notification.error({ message: data?.message ?? 'Something went wrong!' })
            }
        }

        const handleOk = async () => {
            await form.validateFields().then((values) => {
                console.log('Address submitted:', values);
                addNewAddress(values);
                onCancel();
            });
        };

        return (
            <Modal
                open={openAddressModal}
                title="Add New Address"
                onCancel={onCancel}
                footer={[
                    <Button key="cancel" onClick={onCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" className="bg-green-500 text-white hover:bg-orange-400 hover:!text-white transition-all" onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Full Name" name="addressName" rules={[{ required: true, message: 'Please enter full name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Address Line" name="addressLine" rules={[{ required: true, message: 'Please enter address line' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Street" name="street" rules={[{ required: true, message: 'Please enter street' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please enter city' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="State" name="state" rules={[{ required: true, message: 'Please enter state' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Postal Code" name="postalCode" rules={[{ required: true, message: 'Please enter postal code' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please enter country' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Landmark" name="landmark" rules={[{ required: true, message: 'Please enter country' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={<span className="text-sm">Primary Address?</span>} name="isPrimary" valuePropName='checked' className="inline-flex">
                        <Checkbox />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    const AddressUpdateModal = () => {
        const [form] = Form.useForm();

        const updateAddress = async (values) => {
            const res = await addressUpdate(addressToUpdate?.id, values?.isPrimary ? 10 : 20, values?.addressName, values?.addressLine, values?.street, values?.city, values?.state, values?.postalCode, values?.country, values?.landmark);
            const data = await res.json();
            var updatedAddresses = addresess;
            if (res.status === 200) {
                notification.info({ message: data?.message });
                if (values?.isPrimary) {
                    updatedAddresses = updatedAddresses.map((address) => {
                        if (address['primary'] === 10) {
                            return { ...address, ['primary']: 20 };
                        }
                        return address;
                    })
                }
                updatedAddresses = updatedAddresses.filter((address) => (address?.id !== addressToUpdate?.id));
                updatedAddresses = [...updatedAddresses, ...[data?.address]];
                dispatch(setAddresses(updatedAddresses));
            } else {
                notification.error({ message: data?.message ?? 'Something went wrong!' });
            }
        }

        const handleOk = async () => {
            await form.validateFields().then((values) => {
                console.log('Address submitted:', values);
                updateAddress(values);
                onCancelUpdate();
            });
        };

        return (
            <Modal
                open={openUpdateAddressModal}
                title="Update Address"
                onCancel={onCancelUpdate}
                footer={[
                    <Button key="cancel" onClick={onCancelUpdate}>
                        Cancel
                    </Button>,
                    <Button key="submit" className="bg-green-500 text-white hover:bg-orange-400 hover:!text-white transition-all" onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Full Name" name="addressName" rules={[{ required: true, message: 'Please enter full name' }]}>
                        <Input placeholder={addressToUpdate?.address_name} />
                    </Form.Item>
                    <Form.Item label="Address Line" name="addressLine" rules={[{ required: true, message: 'Please enter address line' }]}>
                        <Input placeholder={addressToUpdate?.address_line} />
                    </Form.Item>
                    <Form.Item label="Street" name="street" rules={[{ required: true, message: 'Please enter street' }]}>
                        <Input placeholder={addressToUpdate?.street} />
                    </Form.Item>
                    <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please enter city' }]}>
                        <Input placeholder={addressToUpdate?.city} />
                    </Form.Item>
                    <Form.Item label="State" name="state" rules={[{ required: true, message: 'Please enter state' }]}>
                        <Input placeholder={addressToUpdate?.state} />
                    </Form.Item>
                    <Form.Item label="Postal Code" name="postalCode" rules={[{ required: true, message: 'Please enter postal code' }]}>
                        <Input placeholder={addressToUpdate?.postal_code} />
                    </Form.Item>
                    <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please enter country' }]}>
                        <Input placeholder={addressToUpdate?.country} />
                    </Form.Item>
                    <Form.Item label="Landmark" name="landmark" rules={[{ required: true, message: 'Please enter country' }]}>
                        <Input placeholder={addressToUpdate?.landmark} />
                    </Form.Item>
                    <Form.Item label={<span className="text-sm">Primary Address?</span>} name="isPrimary" valuePropName='checked' className="inline-flex" initialValue={addressToUpdate?.primary === 10}>
                        <Checkbox />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    return <div className="h-full container mx-auto flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addresess.length > 0 ? addresess?.map((address) => (
                <div className={address?.primary === 10 ? 'order-first h-full' : 'h-full'} key={address?.id}>
                    <Card className="h-full" key={address?.id} style={{ border: 'none' }} bordered={false} title={<div className={address?.primary === 20 ? 'justify-end flex flex-row text-black' : 'justify-between flex flex-row text-black'}>{address?.primary === 10 ? <span>Default</span> : ''}<span><DeleteOutlined onClick={() => deleteAddressHandle(address?.id)} className="px-2" /><EditOutlined onClick={() => handleUpdate(address)} /></span></div>}>
                        <h1>{address?.address_name}</h1>
                        <span>{address?.address}, {address?.street}, {address?.city}, {address?.state}, {address?.country}, {address?.landmark},</span>
                        <span>{address?.postal_code}</span>
                    </Card>
                </div>
            )) : ''}
        </div>
        <div className="flex justify-center pt-10"><Button className="border border-orange-500 text-orange-500" onClick={handleAdd} icon={<PlusOutlined />}>Add Address</Button></div>
        <AddressModal />
        <AddressUpdateModal />
    </div>
}
export default AddressPage;