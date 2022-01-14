import { Row, Col, Typography, Divider, Select } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckOutlined, CloseOutlined, DollarCircleOutlined, FundOutlined, InfoCircleOutlined, MoneyCollectOutlined, NumberOutlined, ThunderboltOutlined, TrophyOutlined } from "@ant-design/icons";
import { useFetchCoinDetail } from "../../hooks/useFetchCoinDetail"
import millify from 'millify';
import LineChart from "../LineChart";
import { useFetchCoinHistory } from "../../hooks/useFetchCoinHistory";


export default function CryptoDetail() {
    const { id } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const [coinDetail, loading] = useFetchCoinDetail({ coinId: id });
    const [coinHistory, loadingHistory] = useFetchCoinHistory({coinId: id, timePeriod});

    if (loading) {
        return <p>Loading ...</p>
    }
    const time = ["3h", "24h", "1d", "7d", "30d", "1m", "3m", "1y", "3y", "5y"];

    const stats = [
        { title: 'Price of USD', value: `$ ${coinDetail?.price && millify(coinDetail?.price || 0)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: coinDetail?.rank, icon: <NumberOutlined /> },
        { title: '24h Volumne', value: `$ ${coinDetail?.['24hVolume'] && millify(coinDetail?.['24hVolume'] || 0)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${coinDetail?.marketCap && millify(coinDetail?.marketCap || 0)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${coinDetail?.allTimeHigh && millify(coinDetail?.allTimeHigh?.price || 0)}`, icon: <TrophyOutlined /> },
    ];

    const otherStats = [
        { title: 'Number of Markets', value: `$ ${coinDetail?.numberOfMarkets && millify(coinDetail?.numberOfMarkets || 0)}`, icon: <FundOutlined /> },
        { title: 'Number of Exchanges', value: `$ ${coinDetail?.numberOfExchanges && millify(coinDetail?.numberOfExchanges || 0)}`, icon: <MoneyCollectOutlined /> },
        { title: 'Approved Supply', value: coinDetail?.supply?.confirmed ? <CheckOutlined /> : <CloseOutlined />, icon: <InfoCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${coinDetail?.supply?.total && millify(coinDetail?.supply?.total || 0)}`, icon: <InfoCircleOutlined /> },
    ]

    return (
        <div className="banner">
            <Row>
                <Col span={24}>
                    <Typography.Title>{coinDetail?.name} ({coinDetail?.symbol}) Price</Typography.Title>
                    <Typography.Paragraph ellipsis>{coinDetail?.name} live price in USD. View statistics, market cap and supply.</Typography.Paragraph>
                    <Divider />
                </Col>
                <Col span={24}>
                    <Col xs={24} lg={5}>
                        <Select style={{ width: '100%' }}
                            defaultValue="7d"
                            onChange={(val) => setTimePeriod(val)}
                        >
                            {
                                time.map(t => (
                                    <Select.Option key={t} value={t}>{t}</Select.Option>
                                ))
                            }
                        </Select>



                    </Col>
                    <Col span={24}>
                        {coinHistory && <LineChart loading={loadingHistory} coinHistory={coinHistory || []} coinName={coinDetail?.name || ''} currentPrice={millify(coinDetail?.price || 0)} />}
                    </Col>
                    <Col xs={24} className="center-text banner">
                        <Row gutter={[32, 32]}>
                            <Col xs={24} md={12} >
                                <Typography.Title level={3}>{coinDetail?.name} Value Statistics</Typography.Title>
                                <p>An overview of stats of {coinDetail?.name}</p>
                                {
                                    stats.map(stat => (
                                        <Col key={stat.uuid} xs={24} className="stats-row" >
                                            <Row>
                                                <Col xs={24} md={12} style={{ textAlign: "left", fontSize: "1.2rem" }}>
                                                    <Typography.Text>{stat.icon}</Typography.Text>&nbsp;&nbsp;
                                                    <Typography.Text>{stat.title}</Typography.Text>
                                                </Col>
                                                <Col xs={24} md={12} style={{ textAlign: "right", fontWeight: "bold", fontSize: "1.2rem" }}>
                                                    <Typography.Text>{stat.value}</Typography.Text>
                                                </Col>
                                            </Row>
                                        </Col>

                                    ))
                                }
                            </Col>

                            <Col xs={24} md={12} >
                                <Typography.Title level={3}>Other Statistics</Typography.Title>
                                <p>An overview of stats of {coinDetail?.name}</p>
                                {
                                    otherStats.map((stat, idx) => (
                                        <Col key={idx} xs={24} className="stats-row">
                                            <Row>
                                                <Col xs={24} md={12} style={{ textAlign: "left", fontSize: "1.2rem" }}>
                                                    <Typography.Text>{stat.icon}</Typography.Text>&nbsp;&nbsp;
                                                    <Typography.Text>{stat.title}</Typography.Text>
                                                </Col>
                                                <Col xs={24} md={12} style={{ textAlign: "right", fontWeight: "bold", fontSize: "1.2rem" }}>
                                                    <Typography.Text>{stat.value}</Typography.Text>
                                                </Col>
                                            </Row>
                                        </Col>

                                    ))
                                }
                            </Col>

                        </Row>
                    </Col>
                </Col>
                <Col span={24} className="banner">
                    <Row>
                        <Col span={24}>
                            <Typography.Title>What is {coinDetail?.name}</Typography.Title>
                            <p dangerouslySetInnerHTML={{ __html: `${coinDetail?.description}` }} ></p>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} className="center-text banner">
                    <Row justify="center">
                        <Col span={24}>
                            <Typography.Title level={3}>{coinDetail?.name} Links</Typography.Title>
                        </Col>
                        {
                            coinDetail?.links.map((link, idx) => (
                                <Col key={idx} xs={24} md={16} className="stats-row" >
                                    <Row>
                                        <Col xs={24} md={12} style={{ textAlign: "left", fontSize: "1.2rem" }}>
                                            <Typography.Title level={5}>{link.type}</Typography.Title>
                                        </Col>
                                        <Col xs={24} md={12} style={{ textAlign: "right", fontWeight: "bold", fontSize: "1.2rem" }}>
                                            <a href={link.url} target="_blank" rel="noreferrer">
                                                {link.name}
                                            </a>
                                        </Col>
                                    </Row>
                                </Col>

                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    )
}