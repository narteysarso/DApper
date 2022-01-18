import { Button, Col, Row, Tag, Typography, Space, Input, InputNumber, Divider } from 'antd';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { useContext, useState } from 'react';
import { TransactionContext } from '../context/Transaction';
import Text from 'antd/lib/typography/Text';
import '../Start-bg.css';
import '../Card.css';

const { Title, Paragraph } = Typography;

const INITIAL_FORM_DATA = { addressTo: '', message: '', keyword: '', amount: 0 };
const Welcome = () => {
    const { connectWallet } = useContext(TransactionContext);
    const [isLoading, setIsLoading] = useState(false);
    const { currentAccount, sendTransaction } = useContext(TransactionContext);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    const handleSubmit = async (e) => {

        try {
            setIsLoading(true);

            e.preventDefault();
            const { addressTo, message, keyword, amount } = formData;
            if (!addressTo || !message || !keyword || !amount) {
                throw Error('Invalid data')
            }

            await sendTransaction({ ...formData });

            setFormData(INITIAL_FORM_DATA);

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const handleInputChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;



        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
    const handleInputNumberChange = (number) => {

        setFormData((prevState) => ({ ...prevState, 'amount': number }));
    }

    return (
        <div className='star-wrapper text-white'>
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            
            <Row className='banner' justify="space-around" align="middle"  >

                <Col >
                    <Title style={{ color: 'white' }}>Send Crypto <br /> Across The World</Title>
                    <Paragraph style={{ color: 'white' }}>
                        Explore the crypto world. Buy and sell cryptocurrency easily with ETHER over the &nbsp; 
                         <span style={{color: 'gold'}}>Ropsten Test Network </span> 
                         <Tag color="red" >( NOT Ethereum Mainnet 🤪 !!!)'</Tag>
                        </Paragraph>

                    {!currentAccount && <Button shape="round" block type='primary' onClick={connectWallet}>Connect Wallet</Button>}

                    <div style={{ marginTop: '20px' }}>
                        <Tag className='customTags br-tl'>Reliability</Tag>
                        <Tag className='customTags'>Security</Tag>
                        <Tag className='customTags br-tr'>Ethereum</Tag>
                        <br />
                        <Tag className='customTags br-bl'>Web 3.0</Tag>
                        <Tag className='customTags'>Low fees</Tag>
                        <Tag className='customTags br-br'>Blockchain</Tag>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <div className='animated-card' style={{ boxShadow: '0px 0px 2px 1px #ddd', width: '30vw', height: '14rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <span style={{ padding: '8px 12px', border: '2px solid #ddd', borderRadius: '30px' }}><SiEthereum /></span>
                            <BsInfoCircle />
                        </div>

                        <div>
                            <Title level={2} style={{textAlign: 'center', color: 'whitesmoke'}}>**** &nbsp;&nbsp; **** &nbsp;&nbsp; **** &nbsp;&nbsp; ETHA</Title>
                        </div>

                        <div >
                            <p>
                                Address <Text ellipsis style={{color: 'whitesmoke'}}>
                                    {formData.addressTo}
                                </Text>
                            </p>
                            <p><b>Ethereum</b></p>
                        </div>

                    </div>

                    <div style={{ marginTop: '20px', borderRadius: '10px', boxShadow: '0px 0px 2px 1px #ddd', padding: '10px' }}>
                        <Space direction='vertical' align='middle' style={{ width: '100%' }}>
                            <form onSubmit={handleSubmit}>
                                <Space direction='vertical' style={{ width: '100%' }}>
                                    <Input onChange={handleInputChange} value={formData.addressTo} required="true" placeholder='Address To' name='addressTo' />
                                    <InputNumber stringMode onChange={handleInputNumberChange} value={formData.amount} required="true" min={0.000000001} step={0.00001} placeholder='Amount (eth)' name='amount' style={{ width: '100%' }} />
                                    <Input onChange={handleInputChange} value={formData.keyword} required="true" placeholder='Keyword (Gif)' name='keyword' />
                                    <Input onChange={handleInputChange} value={formData.message} placeholder='Enter message' name='message' />
                                </Space>

                                <Divider children={<SiEthereum />} style={{ color: 'white', borderColor: 'white' }} />
                                <Button htmlType='submit' block loading={isLoading} shape='round' type='default'>Send Now</Button>
                            </form>

                        </Space>
                    </div>
                </Col>

            </Row>
        </div>
    )
}

export default Welcome;