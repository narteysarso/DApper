import { Col, Row, Statistic, Typography } from "antd";
import { useFetchCoin } from "../../hooks/useFetchCoin"
import millify from "millify";
import { Link } from "react-router-dom";
import Cryptocurrency from "./Cryptocurrency";
import News from "./News";


export default function Home() {

    const [data, isLoading] = useFetchCoin();


    if (isLoading) {
        return <p>Is loading...</p>
    };

    return (
        <div style={{padding: '2rem'}}>
            <Typography.Title>Global Cryptocurrency Stats</Typography.Title>
            <Row>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={data?.stats?.total || 0} /></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(data?.stats?.totalExchanges || 0)} /></Col>
                <Col span={12}><Statistic title="Total Market Cap" value={millify(data?.stats?.totalMarketCap || 0)} /></Col>
                <Col span={12}><Statistic title="Total 24h Volume" value={millify(data?.stats?.total24hVolume || 0)} /></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(data?.stats?.totalMarkets || 0)} /></Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={20} >
                            <Typography.Title level={2}>Top 10 Cryptocurrencies in the world</Typography.Title>
                        </Col>
                        <Col span={4}>
                            <Typography.Title level={3}><Link to="/cryptocurrencies" >Show more</Link></Typography.Title>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Cryptocurrency simplified={true} />
                </Col>
            </Row>
            <Row>
                <Col span={24} >
                    <Row>
                        <Col span={20} >
                            <Typography.Title level={2}>Latest Crypto News</Typography.Title>
                        </Col>
                        <Col span={4}>
                            <Typography.Title level={3}><Link to="/news" >Show more</Link></Typography.Title>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <News simplified={true} />
                </Col>
            </Row>
        </div>
    )
}