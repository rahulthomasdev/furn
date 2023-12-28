'use client'
import ProductList from "../components/ProductList";

const { Space, Row } = require("antd")

const ProductsPage = () => {
    return <div className="!min-h-screen bg-white" style={{ minHeight: '100%' }}>
        <div className="flex-row items-center mx-0 pt-5 pb-8">
            <h1 className="container mx-auto text-slate-600 font-bold text-center text-3xl">All Products</h1>
        </div>
        <div >
            <ProductList viewAll={false} />
        </div>
    </div>
}
export default ProductsPage;