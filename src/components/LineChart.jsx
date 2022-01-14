import { Row, Col, Typography } from "antd";
import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export default function LineChart({ coinHistory, coinName, currentPrice, loading }) {

    const coinPrice = [];
    const coinTimestamp = [];

    for(let time of coinHistory.history){
        coinPrice.push(time.price);
        coinTimestamp.push((new Date(time.timestamp)).toLocaleDateString())
    }

    const data = {
        labels: coinTimestamp,
        datasets: [{
            label: 'Price in USD',
            data: coinPrice,
            fill: false,
            backgroundColor: "#0071bd",
            borderColor: '#0071bd'
        }]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

    if(loading) return 'Loading...'

    return (
        <Row>
            <Col span={24}>
                <Row >
                    <Col span={12}>
                        <Typography.Title level={4}>{coinName} Price Chart</Typography.Title>
                    </Col>
                    <Col span={12} >
                        <span>Change: <b>{coinHistory?.change}</b> </span>
                        <span>Current {coinName} Price: <b>{currentPrice}</b> </span>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Line options={options} data={data} />
            </Col>
        </Row>
    )
}
