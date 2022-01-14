import { List, Typography, Avatar, Row, Col } from 'antd';
import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import {RiHeart2Fill} from 'react-icons/ri';

const { Title } = Typography;
const data = [
    {
        icon: <BsShieldFillCheck className='item-icon bg-blue' />,
        title: 'Security Guarantee',
        description: "Welcome to the website. If you're here, you're likely looking to find random words. Random Word Generator is the perfect tool to help you do this. While this tool isn't a word creator, it is a word generator that will generate random words for a variety of activities or uses",
    },
    {
        icon: < BiSearchAlt className='item-icon bg-purple'/>,
        title: 'Best Exchange Rates',
        description: "Welcome to the website. If you're here, you're likely looking to find random words. Random Word Generator is the perfect tool to help you do this. While this tool isn't a word creator, it is a word generator that will generate random words for a variety of activities or uses",
    },
    {
        icon: < RiHeart2Fill className='item-icon bg-red'/>,
        title: 'Fast Transactions',
        description: "Welcome to the website. If you're here, you're likely looking to find random words. Random Word Generator is the perfect tool to help you do this. While this tool isn't a word creator, it is a word generator that will generate random words for a variety of activities or uses",
    }
]
const Services = () => {
    return (
        <Row className='banner' justify="space-around" align="middle" >
            <Col xs={24} sm={24} md={12}>
                <Title style={{fontSize: "3.6rem", padding: "2rem"}}>Services that we continue to improve</Title>
            </Col>
            <Col xs={24} sm={24} md={12}>
                <List
                    dataSource={data}
                    renderItem={(item, idx) => (
                        <List.Item key={idx} className='item'>
                            <List.Item.Meta
                                avatar={<Avatar icon={item.icon} />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description={item.description}
                            />

                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
}

export default Services;