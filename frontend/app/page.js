import { Layout } from 'antd';
import Banner from './components/Banner';
import BottomBanner from './components/BottomBanner';

import ProductSection from './components/ProductSection';
import './globals.css';

export default function Home() {
  return (
    <Layout className='bg-white min-h-screen mx-0'>
      <Banner />
      <ProductSection />
      <BottomBanner />
    </Layout>
  )
}
