import axios from 'axios';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key':  process.env.REACT_APP_RAPID_API_KEY
  }

const baseURL = 'https://coinranking1.p.rapidapi.com'

const api = axios.create({ baseURL});

export async function getCoins({limit = 100} = {}){
    return await api.get(`/coins?limit=${limit}`, {
        headers: cryptoApiHeaders
    });

} ;


export async function getCoinDetail({coinId} = {}){
    return await api.get(`/coin/${coinId}`, {
        headers: cryptoApiHeaders
    });
}

export async function getCoinHistory({coinId, timePeriod} = {}){
    return await api.get(`/coin/${coinId}/history`, {
        headers: cryptoApiHeaders,
        params: {
            timePeriod
        }
    });
}