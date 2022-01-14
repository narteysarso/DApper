import {Layout} from "antd";
import { Outlet } from "react-router-dom";
import Navbar from '../Navbar';
const { Header, Content, Footer } = Layout;

export default function MainLayout({children}){
    return (
        <Layout className='site-layout'>

        <Header>
          <Navbar />
        </Header>

        <Content className='main'>
            <Outlet />
        </Content>
        
        <Footer>
          <p style={{textAlign: 'center'}}> KryptoVers &copy; {(new Date()).getFullYear()} | Hire Me: <a rel='noreferrer' href="https://www.linkedin.com/in/narteykodjosarso/" target="_blank" >Nartey Kodjo-Sarso</a></p>
        </Footer>

    </Layout>
    )
}