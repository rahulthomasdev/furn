"use client";

import { Spin } from "antd";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";


export function Providers({ children }) {
    return <Provider store={store}>
        <PersistGate loading={<div className="bg-white h-screen w-full flex justify-center items-center"><Spin size='large' /></div>} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
}