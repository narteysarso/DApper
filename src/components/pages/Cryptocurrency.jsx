import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchCoin } from "../../hooks/useFetchCoin"

export default function Cryptocurrency({ simplified }) {
    const count = simplified ? 10 : 100;
    const [cryptos, isLoading] = useFetchCoin({ limit: count });
    const [filteredCryptos, setFilteredCryptos] = useState([]);
    const [searchTerm, setSearchTem] = useState("");


    const handleSearch = (e) => {
        setSearchTem(e.target.value)
    }

    useEffect(() => {
        const filteredCoins = cryptos.coins?.filter(crypto => crypto.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        setFilteredCryptos(filteredCoins);

    }, [searchTerm, cryptos]);

    return (
        <div style={simplified ? {} : { padding: '2rem' }}>
            {!simplified && <Row justify="center" style={{ padding: '2rem', marginBottom: '5px' }}>
                <Col span={14}>
                    <Input.Search placeholder="Search crypto" onChange={handleSearch} />
                </Col>
            </Row>}

            {isLoading ? (<p>Loading ...</p>)
                :
                (<Row gutter={[32, 32]}>
                    {filteredCryptos?.map((crypto, idx) => (
                        <Col xs={24} sm={12} lg={6} key={crypto.uuid}>
                            <Link to={`/cryptocurrencies/${crypto.uuid}`}>
                                <Card
                                    title={`${crypto.rank}. ${crypto.name}`}
                                    extra={<img className="crypto-icon" src={crypto.iconUrl} alt={`${crypto.name} icon`} />}
                                    hoverable={true}>
                                    <p>Price: {millify(crypto.price)}</p>
                                    <p>Market Cap: {millify(crypto.marketCap)}</p>
                                    <p>Daily Change: {millify(crypto.change)}%</p>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>)
            }
        </div>
    )
}