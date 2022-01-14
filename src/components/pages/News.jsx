import { Row, Col,Card, Avatar, Typography, Select } from "antd";
import moment from "moment";
import {  useState } from "react";
import { useFetchCoin } from "../../hooks/useFetchCoin";
import { useFetchNews } from "../../hooks/useFetchNews"

const { Meta } = Card;

const demoImage = "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";
export default function News({ simplified = false }) {
    const count = simplified ? 6 : 12;
    const [newsCategory, setNewsCategory] = useState('cryptocurrency');
    const [news, isLoading] = useFetchNews({ limit: count, searchword: newsCategory});
    const [cryptos, cryptoLoading] = useFetchCoin({ limit: 100 });

    const handleSearch = (e) => {

        setNewsCategory(e)
    }


    return (
        <div style={simplified ? {} : { padding: '2rem' }}>
            {!simplified && <Row justify="right" style={{ padding: '2rem', marginBottom: '5px' }}>
                <Col span={6}>
                    <Select
                        defaultValue={newsCategory}
                        showSearch
                        loading={cryptoLoading}
                        style={{ width: '100%' }}
                        onChange={handleSearch}
                    >
                        <Select.Option key={0} value={`cryptocurrency`}>
                            Cryptocurrency
                        </Select.Option>
                        {
                            cryptos?.coins?.map(coin => (
                                <Select.Option key={coin.uuid} value={coin.name.toLowerCase()}>
                                    {coin.name}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>}

            {isLoading ?

                (<>Loading ...</>) :
                (
                    <Row gutter={[24, 24]}>
                        {news?.map((news, idx) => (
                            <Col xs={24} sm={12} lg={8} key={idx}>

                                <Card className="news-card"
                                    hoverable={true}
                                    title={<Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />}
                                    extra={<Typography.Text> {moment(news.datePublished).startOf('seconds').fromNow()} </Typography.Text>}
                                    cover={
                                        <img className="news-image" src={news?.image?.thumbnail?.contentUrl || demoImage} alt={`news`} />
                                    }>
                                    <a href={news.url} rel="noreferrer" target="_blank">
                                        <Meta
                                            avatar={<Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />}
                                            title={news.name}
                                            description={news.description.length > 100 ? `${news.description.substr(0, 100)}...` : news.description}
                                        />

                                    </a>
                                </Card>

                            </Col>
                        ))}
                    </Row>)
            }
        </div>
    )
}