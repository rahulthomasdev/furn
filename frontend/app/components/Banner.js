'use client'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Carousel } from 'antd';
import { useRef } from 'react';
const Banner = () => {
    const carouselRef = useRef();
    const handleNext = () => {
        carouselRef.current.next();
    }
    const handlePrev = () => {
        carouselRef.current.prev();
    }
    const contentStyle = {
        margin: 0,
        height: '500px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: 'gray',
        width: '100%'
    };
    return (
        <div style={{ position: 'relative' }}>
            <Carousel ref={carouselRef}>
                <div>
                    <img style={contentStyle} src='https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg' className='!object-cover' />

                </div>
                <div>
                    <img style={contentStyle} src='https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg' className='!object-cover' />
                </div>
                <div>
                    <img style={contentStyle} src='https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg' className='!object-cover' />
                </div>
                <div>
                    <img style={contentStyle} src='https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg' className='!object-cover' />
                </div>
            </Carousel>
            <div style={{ textAlign: 'center', marginTop: '16px', position: 'absolute', top: '50%', zIndex: 100, display: 'flex', justifyContent: "space-between", width: '100%' }}>
                <Button onClick={handlePrev} className='bg-transparent border-0'><LeftOutlined style={{ color: 'orange', fontSize: '1.5rem' }} /></Button>
                <Button onClick={handleNext} style={{ marginLeft: '8px' }} className='bg-transparent border-0'><RightOutlined style={{ color: 'orange', fontSize: '1.5rem' }} /></Button>
            </div>
        </div>)
}
export default Banner;