
import { ConfigProvider } from 'antd';
import { Inter } from 'next/font/google';
import '../styles/style.scss';
import FooterComponent from './components/Footer';
import Navbar from "./components/Navbar";
import './globals.css';
import StyledComponentsRegistry from './lib/AntdRegistry';
import { Providers } from './redux/provider';
import theme from './theme/themeConfig';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Furn',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>
            <Providers >
              <Navbar />
              {children}
              <FooterComponent />
            </Providers>
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
