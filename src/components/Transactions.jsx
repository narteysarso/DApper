import { Typography, Card, Row, Col, Table } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Text from 'antd/lib/typography/Text';
import { useContext } from 'react';
import { BiSend } from 'react-icons/bi';
import { TransactionContext } from '../context/Transaction';
import { convertUnixTimeStampToDate, convertWeiToEth } from '../utils/converts';

const { Title } = Typography;

const Transactions = () => {

    const {transactions} = useContext(TransactionContext);

    return (
        <div className="banner">
            <Title level={3} style={{textAlign: 'center'}}>Latest Transactions</Title>
            <Row justify='center'>
                <Col xs={24} sm={20} md={20}>
                    <Card >
                        <Table
                            bordered
                            scroll={{ x: 900 }}
                            columns={[
                                { 
                                    title: 'Sender',
                                    key: 'sender', 
                                    dataIndex: 'sender',
                                    width: '20%',
                                    render: (value) => <Text ellipsis><Avatar icon={<BiSend />} /> {value}</Text>
                                },
                                {
                                    title: 'Date', 
                                    key: 'date', 
                                    dataIndex: 'date',
                                    render: (value) => convertUnixTimeStampToDate(transactions[0]?.timestamp.toNumber())?.toLocaleDateString()
                                 },
                                {title: 'Receiver', key: 'receiver', dataIndex: 'receiver'},
                                {
                                    title: 'Amount (ETH)', 
                                    key: 'amount', 
                                    dataIndex: 'amount', 
                                    render: (value) => convertWeiToEth(value?.toNumber())
                                },
                                {title: 'Keyword', key: 'keyword', dataIndex: 'keyword',responsive: ['md']},
                                {title: 'Message', key: 'message', dataIndex: 'message', responsive: ['md']},
                            ]}
                            rowKey={'timestamp'}
                            dataSource={transactions}
                            
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Transactions;